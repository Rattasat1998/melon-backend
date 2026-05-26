import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedFarmIds = [
  "11111111-1111-4111-8111-111111111111",
  "22222222-2222-4222-8222-222222222222",
];

const cycleIds = {
  greenNet: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1",
  gold: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2",
  kimiji: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3",
  planned: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa4",
  harvested: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa5",
};

function daysFromNow(days) {
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCDate(date.getUTCDate() + days);
  return date;
}

async function resetSeedData() {
  await prisma.task.deleteMany({
    where: {
      OR: [
        { farmId: { in: seedFarmIds } },
        { cropCycleId: { in: Object.values(cycleIds) } },
      ],
    },
  });
  await prisma.sensorReading.deleteMany({
    where: { cropCycleId: { in: Object.values(cycleIds) } },
  });
  await prisma.growthLog.deleteMany({
    where: { cropCycleId: { in: Object.values(cycleIds) } },
  });
  await prisma.cropCycle.deleteMany({
    where: { id: { in: Object.values(cycleIds) } },
  });
  await prisma.farm.deleteMany({
    where: { id: { in: seedFarmIds } },
  });
}

async function createSeedData() {
  const mainFarm = await prisma.farm.create({
    data: {
      id: seedFarmIds[0],
      name: "Melon Command Center",
      location: "Ratchaburi, Thailand",
      ownerName: "คุณคมสันต์",
      notes: "Mockup farm data for frontend integration and dashboard testing.",
    },
  });

  const researchFarm = await prisma.farm.create({
    data: {
      id: seedFarmIds[1],
      name: "Melon R&D Greenhouse",
      location: "Nakhon Pathom, Thailand",
      ownerName: "ทีมวิจัย",
      notes:
        "Small research greenhouse for trial varieties and sensor calibration.",
    },
  });

  const cycles = await Promise.all([
    prisma.cropCycle.create({
      data: {
        id: cycleIds.greenNet,
        farmId: mainFarm.id,
        name: "C-2026-001 Green Net A",
        variety: "Green Net Melon",
        status: "ACTIVE",
        startedAt: daysFromNow(-46),
        expectedHarvestAt: daysFromNow(29),
        plantsCount: 1280,
        areaSqm: "640.00",
        notes: "Current main production batch in fruit expansion stage.",
      },
    }),
    prisma.cropCycle.create({
      data: {
        id: cycleIds.gold,
        farmId: mainFarm.id,
        name: "C-2026-002 Golden Queen B",
        variety: "Golden Queen",
        status: "ACTIVE",
        startedAt: daysFromNow(-22),
        expectedHarvestAt: daysFromNow(53),
        plantsCount: 960,
        areaSqm: "520.00",
        notes: "Vegetative stage batch with normal growth.",
      },
    }),
    prisma.cropCycle.create({
      data: {
        id: cycleIds.kimiji,
        farmId: mainFarm.id,
        name: "C-2026-003 Kimoji D",
        variety: "Kimoji Melon",
        status: "ACTIVE",
        startedAt: daysFromNow(-68),
        expectedHarvestAt: daysFromNow(7),
        plantsCount: 720,
        areaSqm: "380.00",
        notes: "Sweetening stage batch, monitor Brix and irrigation closely.",
      },
    }),
    prisma.cropCycle.create({
      data: {
        id: cycleIds.planned,
        farmId: researchFarm.id,
        name: "C-2026-004 Trial Seedling",
        variety: "Premium Trial F1",
        status: "PLANNED",
        startedAt: daysFromNow(5),
        expectedHarvestAt: daysFromNow(80),
        plantsCount: 240,
        areaSqm: "120.00",
        notes: "Upcoming trial batch for next greenhouse cycle.",
      },
    }),
    prisma.cropCycle.create({
      data: {
        id: cycleIds.harvested,
        farmId: mainFarm.id,
        name: "C-2026-000 Export Premium",
        variety: "Japanese Musk Melon",
        status: "HARVESTED",
        startedAt: daysFromNow(-92),
        expectedHarvestAt: daysFromNow(-15),
        harvestedAt: daysFromNow(-13),
        plantsCount: 1100,
        areaSqm: "610.00",
        notes: "Harvested export-grade batch used as historical reference.",
      },
    }),
  ]);

  const [greenNet, gold, kimiji] = cycles;

  await prisma.growthLog.createMany({
    data: [
      {
        id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb1",
        cropCycleId: greenNet.id,
        stage: "VEGETATIVE",
        loggedAt: daysFromNow(-18),
        heightCm: "74.50",
        leafCount: 22,
        fruitCount: 0,
        temperatureC: "28.40",
        humidityPercent: "72.00",
        ph: "6.20",
        notes: "Strong vegetative growth and clean leaf canopy.",
      },
      {
        id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb2",
        cropCycleId: greenNet.id,
        stage: "FRUITING",
        loggedAt: daysFromNow(-4),
        heightCm: "138.00",
        leafCount: 34,
        fruitCount: 2,
        temperatureC: "29.10",
        humidityPercent: "70.00",
        ph: "6.10",
        notes: "Selected primary fruit, begin support net checks.",
      },
      {
        id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb3",
        cropCycleId: gold.id,
        stage: "VEGETATIVE",
        loggedAt: daysFromNow(-2),
        heightCm: "58.20",
        leafCount: 18,
        fruitCount: 0,
        temperatureC: "27.90",
        humidityPercent: "74.00",
        ph: "6.30",
        notes: "Normal growth, continue pruning plan.",
      },
      {
        id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb4",
        cropCycleId: kimiji.id,
        stage: "RIPENING",
        loggedAt: daysFromNow(-1),
        heightCm: "151.00",
        leafCount: 29,
        fruitCount: 1,
        temperatureC: "30.20",
        humidityPercent: "66.00",
        ph: "6.00",
        notes: "Brix trending upward, reduce irrigation gradually.",
      },
    ],
  });

  await prisma.sensorReading.createMany({
    data: [
      {
        id: "cccccccc-cccc-4ccc-8ccc-ccccccccccc1",
        cropCycleId: greenNet.id,
        sensorId: "GH-A-ENV-01",
        recordedAt: new Date(),
        temperatureC: "28.60",
        humidityPercent: "71.20",
        soilMoisturePercent: "42.50",
        ph: "6.18",
        ec: "1.82",
      },
      {
        id: "cccccccc-cccc-4ccc-8ccc-ccccccccccc2",
        cropCycleId: gold.id,
        sensorId: "GH-B-ENV-01",
        recordedAt: new Date(),
        temperatureC: "27.80",
        humidityPercent: "75.10",
        soilMoisturePercent: "46.30",
        ph: "6.24",
        ec: "1.58",
      },
      {
        id: "cccccccc-cccc-4ccc-8ccc-ccccccccccc3",
        cropCycleId: kimiji.id,
        sensorId: "GH-D-ENV-01",
        recordedAt: new Date(),
        temperatureC: "30.40",
        humidityPercent: "64.80",
        soilMoisturePercent: "35.10",
        ph: "6.04",
        ec: "2.72",
      },
    ],
  });

  await prisma.task.createMany({
    data: [
      {
        id: "dddddddd-dddd-4ddd-8ddd-ddddddddddd1",
        farmId: mainFarm.id,
        cropCycleId: greenNet.id,
        title: "ตรวจขนาดผลและแขวนผลรอบเย็น",
        type: "INSPECTION",
        status: "TODO",
        dueAt: daysFromNow(0),
        notes: "Check Green Net A fruit support and record photo evidence.",
      },
      {
        id: "dddddddd-dddd-4ddd-8ddd-ddddddddddd2",
        farmId: mainFarm.id,
        cropCycleId: greenNet.id,
        title: "ให้น้ำรอบเช้าโรงเรือน A",
        type: "WATERING",
        status: "DONE",
        dueAt: daysFromNow(0),
        completedAt: new Date(),
        notes: "Drip irrigation 28 minutes, EC 1.8.",
      },
      {
        id: "dddddddd-dddd-4ddd-8ddd-ddddddddddd3",
        farmId: mainFarm.id,
        cropCycleId: gold.id,
        title: "ตัดแขนงและผูกเชือก Golden Queen",
        type: "PRUNING",
        status: "TODO",
        dueAt: daysFromNow(1),
        notes: "Prioritize rows B2-B3.",
      },
      {
        id: "dddddddd-dddd-4ddd-8ddd-ddddddddddd4",
        farmId: mainFarm.id,
        cropCycleId: kimiji.id,
        title: "ตรวจค่า Brix ก่อนเก็บเกี่ยว",
        type: "INSPECTION",
        status: "TODO",
        dueAt: daysFromNow(1),
        notes: "Target Brix >= 14.5 before harvest confirmation.",
      },
      {
        id: "dddddddd-dddd-4ddd-8ddd-ddddddddddd5",
        farmId: researchFarm.id,
        cropCycleId: cycleIds.planned,
        title: "เตรียมถาดเพาะและวัสดุปลูก Trial F1",
        type: "OTHER",
        status: "TODO",
        dueAt: daysFromNow(3),
        notes: "Prepare seedling tray and label experiment rows.",
      },
    ],
  });

  return { farms: [mainFarm, researchFarm], cycles };
}

async function main() {
  await resetSeedData();
  const result = await createSeedData();

  console.log(
    `Seeded ${result.farms.length} farms, ${result.cycles.length} crop cycles, 4 growth logs, 3 sensor readings, and 5 tasks.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
