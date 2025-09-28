// src/mock.js

// === Constantes (strings em PT-BR) ===
export const OS_STATUS = {
  PENDENTE: "PENDENTE",
  EM_EXECUCAO: "EM EXECUÇÃO",
  CONCLUIDO: "CONCLUÍDO",
};

export const PRIORIDADE = {
  ALTA: "ALTA",
  MEDIA: "MÉDIA",
  BAIXA: "BAIXA",
};

export const CRITICIDADE = {
  VERMELHO: "VERMELHO",
  AMARELO: "AMARELO",
  VERDE: "VERDE",
};

export const EQUIP_STATUS = {
  OPERACIONAL: "OPERACIONAL",
  ATENCAO: "ATENÇÃO",
  EM_MANUTENCAO: "EM MANUTENÇÃO",
  OFFLINE: "OFFLINE",
};

// === Técnicos (8) ===
export const technicians = [
  { id: 1, name: "Carlos Silva",   shift: "Manhã", active: true },
  { id: 2, name: "Bianca Souza",   shift: "Manhã", active: true },
  { id: 3, name: "Rafael Lima",    shift: "Tarde", active: false },
  { id: 4, name: "João Pedro",     shift: "Manhã", active: true },
  { id: 5, name: "Mariana Alves",  shift: "Noite", active: false },
  { id: 6, name: "Luís Fernando",  shift: "Manhã", active: true },
  { id: 7, name: "Patrícia Melo",  shift: "Tarde", active: false },
  { id: 8, name: "Renato Costa",   shift: "Manhã", active: true },
];

// === Equipamentos / Ativos (12) ===
export const equipments = [
  { id:"CT-21",  name:"Correia Transportadora CT-21",   sector:"Setor B - Linha 2", uptime:88, alerts:1, status:EQUIP_STATUS.ATENCAO },
  { id:"M-12",   name:"Motor Secundário M-12",          sector:"Setor A - Linha 1", uptime:91, alerts:0, status:EQUIP_STATUS.OPERACIONAL },
  { id:"BH-07",  name:"Bomba Hidráulica BH-07",         sector:"Setor C - Conformação", uptime:86, alerts:1, status:EQUIP_STATUS.ATENCAO },
  { id:"CP-001", name:"Compressor de Ar CP-001",        sector:"Setor A - Linha 1", uptime:92, alerts:1, status:EQUIP_STATUS.EM_MANUTENCAO },
  { id:"EST-003",name:"Esteira Transportadora EST-003", sector:"Setor B - Linha 2", uptime:85, alerts:2, status:EQUIP_STATUS.ATENCAO },
  { id:"PH-002", name:"Prensa Hidráulica PH-002",       sector:"Setor C - Conformação", uptime:98, alerts:0, status:EQUIP_STATUS.OPERACIONAL },
  { id:"RB-001", name:"Robot Soldador RB-001",          sector:"Setor D - Soldagem", uptime:9,  alerts:3, status:EQUIP_STATUS.OFFLINE },
  { id:"TB-14",  name:"Torno Bancada TB-14",            sector:"Oficina Mecânica", uptime:93, alerts:0, status:EQUIP_STATUS.OPERACIONAL },
  { id:"EX-05",  name:"Exaustor Industrial EX-05",      sector:"Fundição", uptime:82, alerts:2, status:EQUIP_STATUS.ATENCAO },
  { id:"VR-02",  name:"Vibrador de Peneira VR-02",      sector:"Britagem", uptime:77, alerts:2, status:EQUIP_STATUS.ATENCAO },
  { id:"GF-11",  name:"Gerador de Força GF-11",         sector:"Utilidades", uptime:96, alerts:0, status:EQUIP_STATUS.OPERACIONAL },
  { id:"CH-09",  name:"Chiller CH-09",                  sector:"Utilidades", uptime:68, alerts:3, status:EQUIP_STATUS.EM_MANUTENCAO },
];

// === Templates de checklist (simplificados) ===
export const checklistTemplates = {
  PADRAO_SEGURANCA: [
    "EPI completo (capacete, óculos, luvas, botas)",
    "Bloqueio e etiquetagem (LOTO) aplicado",
    "Área isolada/sinalizada",
  ],
  CORREIA_TRANSPORTADORA: [
    "Inspeção do esticador",
    "Verificar alinhamento da correia",
    "Lubrificar roletes críticos",
  ],
  MOTOR: [
    "Inspeção de rolamentos",
    "Verificar ruído e vibração",
    "Apertos elétricos do borne",
  ],
  BOMBA_HIDRAULICA: [
    "Nível e contaminação do óleo",
    "Verificar vazamentos",
    "Estado de mangueiras e conexões",
  ],
};

// Helper para horário (hoje às hh:mm)
const today = (h, m) => {
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};

// === Ordens de Serviço (≈20) ===
// 3 primeiras: estudo de caso (Carlos - Manhã)
export const orders = [
  // Estudo de caso – Rota do Carlos
  {
    id: "OS-010",
    title: "Verificação preventiva da correia transportadora",
    equipment: "Correia Transportadora CT-21",
    sector: "Setor B - Linha 2",
    assetId: "CT-21",
    estimateMin: 25,
    assigneeId: 1,
    priority: PRIORIDADE.MEDIA,
    status: OS_STATUS.CONCLUIDO,
    criticLight: CRITICIDADE.VERDE,
    plannedStart: today(7, 0),
    startedAt:    today(7, 5),
    finishedAt:   today(7, 25),
    checklistTemplateId: "CORREIA_TRANSPORTADORA",
    photos: { before: "/mock/ct21-before.jpg", after: "/mock/ct21-after.jpg" },
    notes: "Inspeção ok, sem anomalias.",
  },
  {
    id: "OS-011",
    title: "Troca de rolamento em motor secundário",
    equipment: "Motor Secundário M-12",
    sector: "Setor A - Linha 1",
    assetId: "M-12",
    estimateMin: 40,
    assigneeId: 1,
    priority: PRIORIDADE.ALTA,
    status: OS_STATUS.EM_EXECUCAO,
    criticLight: CRITICIDADE.AMARELO,
    plannedStart: today(7, 30),
    startedAt:    today(7, 40),
    finishedAt:   null,
    checklistTemplateId: "MOTOR",
    photos: { before: "/mock/m12-before.jpg", after: null },
    notes: "Peça em substituição; aguardando reaperto final.",
  },
  {
    id: "OS-012",
    title: "Checklist de segurança em bomba hidráulica",
    equipment: "Bomba Hidráulica BH-07",
    sector: "Setor C - Conformação",
    assetId: "BH-07",
    estimateMin: 20,
    assigneeId: 1,
    priority: PRIORIDADE.MEDIA,
    status: OS_STATUS.PENDENTE,
    criticLight: CRITICIDADE.AMARELO,
    plannedStart: today(8, 20),
    startedAt: null,
    finishedAt: null,
    checklistTemplateId: "BOMBA_HIDRAULICA",
    photos: { before: null, after: null },
    notes: "",
  },

  // Demais OSs (diversas combinações)
  {
    id: "OS-001",
    title: "Manutenção preventiva - Compressor A1",
    equipment: "Compressor de Ar CP-001",
    sector: "Setor A - Linha 1",
    assetId: "CP-001",
    estimateMin: 150,
    assigneeId: 2,
    priority: PRIORIDADE.ALTA,
    status: OS_STATUS.PENDENTE,
    criticLight: CRITICIDADE.VERMELHO,
    plannedStart: today(9, 0),
    startedAt: null, finishedAt: null,
    checklistTemplateId: "PADRAO_SEGURANCA",
    photos: { before: null, after: null },
  },
  {
    id: "OS-002",
    title: "Reparo urgente - Esteira transportadora",
    equipment: "Esteira Transportadora EST-003",
    sector: "Setor B - Linha 2",
    assetId: "EST-003",
    estimateMin: 90,
    assigneeId: 2,
    priority: PRIORIDADE.ALTA,
    status: OS_STATUS.EM_EXECUCAO,
    criticLight: CRITICIDADE.AMARELO,
    plannedStart: today(7, 0),
    startedAt: today(7, 10), finishedAt: null,
    checklistTemplateId: "CORREIA_TRANSPORTADORA",
    photos: { before: "/mock/est-before.jpg", after: null },
  },
  {
    id: "OS-003",
    title: "Preventiva - Motor PH-002",
    equipment: "Prensa Hidráulica PH-002",
    sector: "Setor C - Conformação",
    assetId: "PH-002",
    estimateMin: 60,
    assigneeId: 6,
    priority: PRIORIDADE.BAIXA,
    status: OS_STATUS.CONCLUIDO,
    criticLight: CRITICIDADE.VERDE,
    plannedStart: today(6, 30),
    startedAt: today(6, 35), finishedAt: today(7, 35),
    checklistTemplateId: "MOTOR",
    photos: { before: "/mock/ph-before.jpg", after: "/mock/ph-after.jpg" },
  },
  { id: "OS-004", title: "Inspeção elétrica geral", equipment: "Utilidades / GF-11",
    sector: "Utilidades", assetId:"GF-11", estimateMin: 50, assigneeId: 4,
    priority: PRIORIDADE.MEDIA, status: OS_STATUS.PENDENTE, criticLight: CRITICIDADE.AMARELO,
    plannedStart: today(10,0), startedAt:null, finishedAt:null, checklistTemplateId:"PADRAO_SEGURANCA", photos:{before:null, after:null} },
  { id: "OS-005", title: "Substituição de mangueira", equipment: "Bomba Hidráulica BH-07",
    sector: "Setor C - Conformação", assetId:"BH-07", estimateMin: 35, assigneeId: 8,
    priority: PRIORIDADE.MEDIA, status: OS_STATUS.PENDENTE, criticLight: CRITICIDADE.AMARELO,
    plannedStart: today(13,0), startedAt:null, finishedAt:null, checklistTemplateId:"BOMBA_HIDRAULICA", photos:{before:null, after:null} },
  { id: "OS-006", title: "Ajuste de alinhamento", equipment: "Vibrador de Peneira VR-02",
    sector: "Britagem", assetId:"VR-02", estimateMin: 40, assigneeId: 6,
    priority: PRIORIDADE.MEDIA, status: OS_STATUS.EM_EXECUCAO, criticLight: CRITICIDADE.AMARELO,
    plannedStart: today(8,0), startedAt:today(8,10), finishedAt:null, checklistTemplateId:"PADRAO_SEGURANCA", photos:{before:null, after:null} },
  { id: "OS-007", title: "Limpeza e reaperto", equipment: "Exaustor Industrial EX-05",
    sector: "Fundição", assetId:"EX-05", estimateMin: 45, assigneeId: 4,
    priority: PRIORIDADE.BAIXA, status: OS_STATUS.CONCLUIDO, criticLight: CRITICIDADE.VERDE,
    plannedStart: today(5,30), startedAt:today(5,35), finishedAt:today(6,20), checklistTemplateId:"PADRAO_SEGURANCA", photos:{before:null, after:null} },
  { id: "OS-008", title: "Verificação de ruído", equipment: "Torno Bancada TB-14",
    sector: "Oficina Mecânica", assetId:"TB-14", estimateMin: 30, assigneeId: 8,
    priority: PRIORIDADE.BAIXA, status: OS_STATUS.PENDENTE, criticLight: CRITICIDADE.VERDE,
    plannedStart: today(14,0), startedAt:null, finishedAt:null, checklistTemplateId:"PADRAO_SEGURANCA", photos:{before:null, after:null} },
  { id: "OS-009", title: "Intervenção corretiva", equipment: "Chiller CH-09",
    sector: "Utilidades", assetId:"CH-09", estimateMin: 60, assigneeId: 6,
    priority: PRIORIDADE.ALTA, status: OS_STATUS.PENDENTE, criticLight: CRITICIDADE.VERMELHO,
    plannedStart: today(11,0), startedAt:null, finishedAt:null, checklistTemplateId:"PADRAO_SEGURANCA", photos:{before:null, after:null} },
  // extras para volume
  { id:"OS-013", title:"Lubrificação programada", equipment:"Correia Transportadora CT-21", sector:"Setor B - Linha 2", assetId:"CT-21", estimateMin:20, assigneeId:2, priority:PRIORIDADE.BAIXA, status:OS_STATUS.PENDENTE, criticLight:CRITICIDADE.VERDE, plannedStart:today(15,0) },
  { id:"OS-014", title:"Teste de vibração", equipment:"Motor Secundário M-12", sector:"Setor A - Linha 1", assetId:"M-12", estimateMin:25, assigneeId:8, priority:PRIORIDADE.MEDIA, status:OS_STATUS.PENDENTE, criticLight:CRITICIDADE.AMARELO, plannedStart:today(16,0) },
  { id:"OS-015", title:"Calibração de sensores", equipment:"Gerador GF-11", sector:"Utilidades", assetId:"GF-11", estimateMin:35, assigneeId:4, priority:PRIORIDADE.BAIXA, status:OS_STATUS.CONCLUIDO, criticLight:CRITICIDADE.VERDE, plannedStart:today(6,0), startedAt:today(6,5), finishedAt:today(6,45) },
  { id:"OS-016", title:"Inspeção visual", equipment:"Robot Soldador RB-001", sector:"Soldagem", assetId:"RB-001", estimateMin:15, assigneeId:6, priority:PRIORIDADE.ALTA, status:OS_STATUS.PENDENTE, criticLight:CRITICIDADE.VERMELHO, plannedStart:today(12,30) },
  { id:"OS-017", title:"Troca de correia", equipment:"Esteira EST-003", sector:"Setor B - Linha 2", assetId:"EST-003", estimateMin:55, assigneeId:2, priority:PRIORIDADE.ALTA, status:OS_STATUS.PENDENTE, criticLight:CRITICIDADE.AMARELO, plannedStart:today(17,0) },
  { id:"OS-018", title:"Teste de carga", equipment:"Chiller CH-09", sector:"Utilidades", assetId:"CH-09", estimateMin:30, assigneeId:8, priority:PRIORIDADE.MEDIA, status:OS_STATUS.PENDENTE, criticLight:CRITICIDADE.AMARELO, plannedStart:today(18,0) },
  { id:"OS-019", title:"Revisão de bornes", equipment:"Prensa PH-002", sector:"Conformação", assetId:"PH-002", estimateMin:25, assigneeId:4, priority:PRIORIDADE.BAIXA, status:OS_STATUS.PENDENTE, criticLight:CRITICIDADE.VERDE, plannedStart:today(19,0) },
  { id:"OS-020", title:"Checagem de segurança", equipment:"Exaustor EX-05", sector:"Fundição", assetId:"EX-05", estimateMin:15, assigneeId:6, priority:PRIORIDADE.MEDIA, status:OS_STATUS.PENDENTE, criticLight:CRITICIDADE.VERDE, plannedStart:today(20,0) },
];

// === Série para gráficos (mantida/ajustada) ===
export const ordersPerDay = {
  labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
  done:    [12, 15,  8, 18, 14, 10,  6],
  pending: [ 3,  2,  4,  1,  5,  2,  1],
};
g