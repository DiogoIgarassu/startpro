export const technicians = [
  { id: 1, name: "Carlos Silva", shift: "Manhã", active: true },
  { id: 2, name: "Bianca Souza", shift: "Manhã", active: true },
  { id: 3, name: "Rafael Lima", shift: "Tarde", active: false },
];

export const orders = [
  { id:"OS-001", title:"Manutenção preventiva - Compressor A1", equipment:"Compressor de Ar CP-001",
    sector:"Setor A - Linha 1", estimateMin:150, assigneeId:1, priority:"HIGH", status:"PENDING", criticLight:"RED" },
  { id:"OS-002", title:"Reparo urgente - Esteira transportadora", equipment:"Esteira Transportadora EST-003",
    sector:"Setor B - Linha 2", estimateMin:90, assigneeId:2, priority:"HIGH", status:"RUNNING", criticLight:"YELLOW" },
  { id:"OS-003", title:"Preventiva - Motor PH-002", equipment:"Prensa Hidráulica PH-002",
    sector:"Setor C - Conformação", estimateMin:60, assigneeId:1, priority:"LOW", status:"DONE", criticLight:"GREEN" },
];

export const equipments = [
  { id:"CP-001", name:"Compressor de Ar CP-001", sector:"Setor A - Linha 1", uptime:92, alerts:1, status:"MAINT" },
  { id:"EST-003", name:"Esteira Transportadora EST-003", sector:"Setor B - Linha 2", uptime:85, alerts:2, status:"ATTENTION" },
  { id:"PH-002", name:"Prensa Hidráulica PH-002", sector:"Setor C - Conformação", uptime:98, alerts:0, status:"OK" },
  { id:"RB-001", name:"Robot Soldador RB-001", sector:"Setor D - Soldagem", uptime:9, alerts:3, status:"OFF" },
];

export const ordersPerDay = {
  labels:["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"],
  done:[12,15,8,18,14,10,6],
  pending:[3,2,4,1,5,2,1],
};
