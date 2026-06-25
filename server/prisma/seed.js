const prisma = require('../src/config/database');

const users = [
    {
        id: 1,
        name: 'João Victor',
        email: 'joao.victor@ufrn.edu.br',
        phone: '(84) 99999-1001',
        university: 'UFRN',
        course: 'Tecnologia da Informação',
        semester: '5º',
        avatarUrl: 'https://i.pravatar.cc/200?img=12',
        bio: 'Estudante da UFRN procurando moradia próxima ao campus central.',
        profile: {
            cleanlinessLevel: 5,
            noiseToleranceLevel: 2,
            socialLevel: 3,
            sleepTime: '22-00',
            wakeTime: 'antes-7',
            studyRoutine: 'noite',
            hasPets: false,
            acceptsPets: true,
            budgetMin: 550,
            budgetMax: 1200,
            neighborhood: 'Lagoa Nova'
        }
    },
    {
        id: 2,
        name: 'Ana Clara',
        email: 'ana.clara@ufrn.edu.br',
        phone: '(84) 99999-1002',
        university: 'UFRN',
        course: 'Ciência e Tecnologia',
        semester: '3º',
        avatarUrl: 'https://i.pravatar.cc/200?img=22',
        bio: 'Procuro dividir apartamento perto do Campus Central e manter uma rotina tranquila de estudos.',
        profile: {
            cleanlinessLevel: 4,
            noiseToleranceLevel: 2,
            socialLevel: 3,
            sleepTime: '22-00',
            wakeTime: '7-9',
            studyRoutine: 'noite',
            hasPets: false,
            acceptsPets: true,
            budgetMin: 500,
            budgetMax: 1100,
            neighborhood: 'Lagoa Nova'
        }
    },
    {
        id: 3,
        name: 'Lucas Martins',
        email: 'lucas.martins@ufrn.edu.br',
        phone: '(84) 99999-1003',
        university: 'UFRN',
        course: 'Engenharia de Computação',
        semester: '6º',
        avatarUrl: 'https://i.pravatar.cc/200?img=23',
        bio: 'Busco uma moradia organizada em Lagoa Nova ou Capim Macio.',
        profile: {
            cleanlinessLevel: 5,
            noiseToleranceLevel: 1,
            socialLevel: 2,
            sleepTime: '22-00',
            wakeTime: 'antes-7',
            studyRoutine: 'noite',
            hasPets: false,
            acceptsPets: false,
            budgetMin: 650,
            budgetMax: 1300,
            neighborhood: 'Capim Macio'
        }
    },
    {
        id: 4,
        name: 'Mariana Souza',
        email: 'mariana.souza@ufrn.edu.br',
        phone: '(84) 99999-1004',
        university: 'UFRN',
        course: 'Psicologia',
        semester: '4º',
        avatarUrl: 'https://i.pravatar.cc/200?img=32',
        bio: 'Gosto de ambientes colaborativos, mas respeito horários de estudo e descanso.',
        profile: {
            cleanlinessLevel: 4,
            noiseToleranceLevel: 3,
            socialLevel: 4,
            sleepTime: '00-02',
            wakeTime: '7-9',
            studyRoutine: 'tarde',
            hasPets: true,
            acceptsPets: true,
            budgetMin: 600,
            budgetMax: 1400,
            neighborhood: 'Ponta Negra'
        }
    },
    {
        id: 5,
        name: 'Pedro Henrique',
        email: 'pedro.henrique@ufrn.edu.br',
        phone: '(84) 99999-1005',
        university: 'UFRN',
        course: 'Administração',
        semester: '2º',
        avatarUrl: 'https://i.pravatar.cc/200?img=45',
        bio: 'Quero morar próximo à UFRN com pessoas comunicativas e rotina flexível.',
        profile: {
            cleanlinessLevel: 3,
            noiseToleranceLevel: 4,
            socialLevel: 5,
            sleepTime: '00-02',
            wakeTime: '9-11',
            studyRoutine: 'flexivel',
            hasPets: false,
            acceptsPets: true,
            budgetMin: 450,
            budgetMax: 1000,
            neighborhood: 'Candelária'
        }
    },
    {
        id: 6,
        name: 'Beatriz Lima',
        email: 'beatriz.lima@ufrn.edu.br',
        phone: '(84) 99999-1006',
        university: 'UFRN',
        course: 'Arquitetura e Urbanismo',
        semester: '7º',
        avatarUrl: 'https://i.pravatar.cc/200?img=47',
        bio: 'Tenho rotina intensa de projetos e prefiro dividir casa com pessoas organizadas.',
        profile: {
            cleanlinessLevel: 5,
            noiseToleranceLevel: 2,
            socialLevel: 2,
            sleepTime: '22-00',
            wakeTime: '7-9',
            studyRoutine: 'noite',
            hasPets: true,
            acceptsPets: true,
            budgetMin: 700,
            budgetMax: 1500,
            neighborhood: 'Lagoa Nova'
        }
    },
    {
        id: 7,
        name: 'Rafael Costa',
        email: 'rafael.costa@ufrn.edu.br',
        phone: '(84) 99999-1007',
        university: 'UFRN',
        course: 'Direito',
        semester: '8º',
        avatarUrl: 'https://i.pravatar.cc/200?img=53',
        bio: 'Procuro quarto individual e valorizo silêncio para leitura e preparação de provas.',
        profile: {
            cleanlinessLevel: 4,
            noiseToleranceLevel: 1,
            socialLevel: 2,
            sleepTime: 'antes-22',
            wakeTime: 'antes-7',
            studyRoutine: 'manha',
            hasPets: false,
            acceptsPets: false,
            budgetMin: 650,
            budgetMax: 1250,
            neighborhood: 'Tirol'
        }
    }
];

const properties = [
    {
        title: 'Apartamento compartilhado em Lagoa Nova',
        price: 1200,
        beds: 2,
        address: 'Rua da Saudade, Lagoa Nova, Natal/RN',
        description: 'Apartamento mobiliado próximo à UFRN, com dois quartos e boa estrutura para estudantes.'
    },
    {
        title: 'Quarto individual perto do campus',
        price: 750,
        beds: 1,
        address: 'Avenida Senador Salgado Filho, Natal/RN',
        description: 'Quarto individual em residência estudantil, com internet, cozinha compartilhada e fácil acesso ao campus.'
    },
    {
        title: 'Casa para dividir em Capim Macio',
        price: 1600,
        beds: 3,
        address: 'Rua Ismael Pereira da Silva, Capim Macio, Natal/RN',
        description: 'Casa ampla com três quartos, sala de estudos e localização favorável para estudantes da UFRN.'
    }
];

async function seedUsers() {
    for (const user of users) {
        const { profile, ...userData } = user;

        await prisma.user.upsert({
            where: { email: user.email },
            update: {
                ...userData,
                profile: {
                    upsert: {
                        create: profile,
                        update: profile
                    }
                }
            },
            create: {
                ...userData,
                profile: {
                    create: profile
                }
            }
        });
    }

    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"User"', 'id'), (SELECT MAX(id) FROM "User"))`;
}

async function seedProperties() {
    for (const property of properties) {
        const existingProperty = await prisma.property.findFirst({
            where: { title: property.title }
        });

        if (!existingProperty) {
            await prisma.property.create({ data: property });
        }
    }
}

async function main() {
    await seedUsers();
    await seedProperties();
    console.log('Seed concluída com usuários, perfis e imóveis demonstrativos.');
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
