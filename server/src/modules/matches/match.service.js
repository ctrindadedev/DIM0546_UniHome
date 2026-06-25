const prisma = require('../../config/database');
const usersMock = require('../../data/users.mock');

const studyRoutineToFilter = {
  manha: 'matutina',
  tarde: 'vespertina',
  noite: 'noturna',
  flexivel: 'flexivel',
};

function calculatePreferenceScore(baseValue, candidateValue, maxPoints) {
  const difference = Math.abs(baseValue - candidateValue);
  return Math.round(maxPoints * (1 - difference / 4));
}

function hasPetCompatibility(baseUser, candidate) {
  const baseAcceptsCandidatePets =
    !candidate.preferences.hasPets || baseUser.preferences.acceptsPets;
  const candidateAcceptsBasePets =
    !baseUser.preferences.hasPets || candidate.preferences.acceptsPets;

  return baseAcceptsCandidatePets && candidateAcceptsBasePets;
}

function calculateCompatibility(baseUser, candidate) {
  const cleanliness = calculatePreferenceScore(
    baseUser.preferences.cleanliness,
    candidate.preferences.cleanliness,
    25,
  );
  const noise = calculatePreferenceScore(
    baseUser.preferences.noise,
    candidate.preferences.noise,
    20,
  );
  const socialLevel = calculatePreferenceScore(
    baseUser.preferences.socialLevel,
    candidate.preferences.socialLevel,
    15,
  );
  const studyRoutine =
    baseUser.preferences.studyRoutine === candidate.preferences.studyRoutine
      ? 20
      : 0;
  const pets = hasPetCompatibility(baseUser, candidate) ? 20 : 0;

  return cleanliness + noise + socialLevel + studyRoutine + pets;
}

function getCompatibilityReasons(baseUser, candidate) {
  const reasons = [];

  if (baseUser.preferences.studyRoutine === candidate.preferences.studyRoutine) {
    reasons.push('Rotina de estudos parecida');
  }

  if (
    Math.abs(baseUser.preferences.noise - candidate.preferences.noise) <= 1
  ) {
    reasons.push('Preferência semelhante por baixo ruído');
  }

  if (
    Math.abs(
      baseUser.preferences.cleanliness - candidate.preferences.cleanliness,
    ) <= 1
  ) {
    reasons.push('Compatibilidade alta em limpeza e organização');
  }

  if (
    Math.abs(
      baseUser.preferences.socialLevel - candidate.preferences.socialLevel,
    ) <= 1
  ) {
    reasons.push('Nível de socialização semelhante');
  }

  if (hasPetCompatibility(baseUser, candidate)) {
    reasons.push('Preferências compatíveis sobre animais de estimação');
  }

  return reasons;
}

function applyMatchFilters(matches, filters) {
  const minimumCompatibility = Number(filters.minCompatibility);

  return matches.filter((match) => {
    if (
      filters.minCompatibility !== undefined &&
      match.compatibility < minimumCompatibility
    ) {
      return false;
    }

    if (
      filters.studyRoutine !== undefined &&
      match.preferences.studyRoutine !== filters.studyRoutine
    ) {
      return false;
    }

    if (filters.acceptsPets !== undefined) {
      const acceptsPets =
        filters.acceptsPets === true || filters.acceptsPets === 'true';

      if (match.preferences.acceptsPets !== acceptsPets) {
        return false;
      }
    }

    return true;
  });
}

function normalizePrismaUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    course: user.course,
    university: user.university,
    period: user.semester,
    bio: user.bio,
    preferences: {
      cleanliness: user.profile.cleanlinessLevel,
      noise: user.profile.noiseToleranceLevel,
      socialLevel: user.profile.socialLevel,
      studyRoutine: studyRoutineToFilter[user.profile.studyRoutine],
      hasPets: user.profile.hasPets,
      acceptsPets: user.profile.acceptsPets,
    },
  };
}

async function getUsersFromDatabase() {
  const users = await prisma.user.findMany({
    where: {
      profile: {
        isNot: null,
      },
    },
    include: { profile: true },
    orderBy: { id: 'asc' },
  });

  return users.map(normalizePrismaUser);
}

async function getMatchUsers() {
  const users = await getUsersFromDatabase();
  return users.length > 1 ? users : usersMock;
}

async function getMatchesByUserId(userId, filters = {}) {
  const normalizedUserId = Number(userId);
  const users = await getMatchUsers();
  const baseUser = users.find((user) => user.id === normalizedUserId);

  if (!baseUser) {
    return null;
  }

  const matches = users
    .filter((user) => user.id !== normalizedUserId)
    .map((candidate) => ({
      userId: candidate.id,
      name: candidate.name,
      course: candidate.course,
      university: candidate.university,
      compatibility: calculateCompatibility(baseUser, candidate),
      reasons: getCompatibilityReasons(baseUser, candidate),
      preferences: candidate.preferences,
    }))
    .sort((first, second) => second.compatibility - first.compatibility);

  return applyMatchFilters(matches, filters);
}

module.exports = { getMatchesByUserId };
