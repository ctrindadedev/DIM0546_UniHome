const prisma = require('../../config/database');
const logger = require('../../utils/logger');
const { NotFoundError } = require('../../errors/AppError');

const demoUser = {
    id: 1,
    name: 'Iury Fredson',
    email: 'iury.fredson@ufrn.edu.br',
    phone: '(84) 99999-0000',
    university: 'UFRN',
    course: 'Tecnologia da Informação',
    semester: '5º',
    avatarUrl: 'https://i.pravatar.cc/200?img=12',
    bio: 'Estudante organizado, com rotina de estudos durante a noite e preferência por ambientes tranquilos durante a semana.',
    profile: {
        cleanlinessLevel: 4,
        noiseToleranceLevel: 3,
        socialLevel: 3,
        sleepTime: '22-00',
        wakeTime: 'antes-7',
        studyRoutine: 'noite',
        acceptsPets: true,
        hasPets: false,
        budgetMin: 550,
        budgetMax: 1200,
        neighborhood: 'Lagoa Nova'
    }
};

function userInclude() {
    return { profile: true };
}

function splitUserData(data) {
    const { profile, ...user } = data;
    return { user, profile };
}

async function ensureDemoUser(reqId) {
    logger.info({ reqId }, 'Garantindo perfil demonstrativo do usuário atual');

    const existingUser = await prisma.user.findUnique({
        where: { id: demoUser.id },
        include: userInclude()
    });

    if (existingUser) {
        if (existingUser.profile) {
            return existingUser;
        }

        return prisma.user.update({
            where: { id: demoUser.id },
            data: {
                profile: {
                    create: demoUser.profile
                }
            },
            include: userInclude()
        });
    }

    const { user, profile } = splitUserData(demoUser);

    return prisma.user.create({
        data: {
            ...user,
            profile: {
                create: profile
            }
        },
        include: userInclude()
    });
}

async function createUser(data, reqId) {
    logger.info({ reqId }, 'Criando usuário');

    const { user, profile } = splitUserData(data);

    return prisma.user.create({
        data: {
            ...user,
            profile: {
                create: profile
            }
        },
        include: userInclude()
    });
}

async function getUsers(reqId) {
    logger.info({ reqId }, 'Buscando usuários cadastrados');

    return prisma.user.findMany({
        include: userInclude(),
        orderBy: { updatedAt: 'desc' }
    });
}

async function getUserById(id, reqId) {
    logger.info({ reqId, userId: id }, 'Buscando usuário');

    const user = await prisma.user.findUnique({
        where: { id },
        include: userInclude()
    });

    if (!user) {
        throw new NotFoundError('Usuário não encontrado');
    }

    return user;
}

async function updateUser(id, data, reqId) {
    logger.info({ reqId, userId: id }, 'Atualizando usuário');

    await getUserById(id, reqId);

    const { user, profile } = splitUserData(data);

    return prisma.user.update({
        where: { id },
        data: {
            ...user,
            ...(profile ? {
                profile: {
                    upsert: {
                        create: profile,
                        update: profile
                    }
                }
            } : {})
        },
        include: userInclude()
    });
}

async function deleteUser(id, reqId) {
    logger.info({ reqId, userId: id }, 'Removendo usuário');

    await getUserById(id, reqId);
    await prisma.user.delete({ where: { id } });

    return { message: 'Usuário deletado com sucesso' };
}

async function getCurrentUser(reqId) {
    return ensureDemoUser(reqId);
}

async function updateCurrentUser(data, reqId) {
    await ensureDemoUser(reqId);
    return updateUser(demoUser.id, data, reqId);
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    getCurrentUser,
    updateCurrentUser
};
