/* Evolink price calculator. PRICES: edit numbers only. All prices are client prices, EUR, excl. IVA. */
(function(){
var L=(document.documentElement.lang||'es').slice(0,2); if(!{es:1,en:1,ru:1}[L])L='es';
var t=function(es,en,ru){return {es:es,en:en,ru:ru};};
var qty=function(max,unit){var o=[];for(var i=0;i<=max;i++)o.push({n:String(i),p:i*unit});return o;};
var UI={
 summary:t('Calcular precio','Estimate price','Рассчитать цену'),
 choose:t('Elige…','Choose…','Выберите…'),
 empty:t('Elige opciones para ver una estimación.','Pick options to see an estimate.','Выберите параметры, чтобы увидеть оценку.'),
 est:t('Estimación orientativa','Approximate estimate','Ориентировочная оценка'),
 vat:t('+ IVA','+ VAT','+ IVA'),
 note:t('Orientativo: el precio final lo confirmo por escrito antes de empezar. Desplazamiento aparte: 50 € + IVA hasta 40 km.','Approximate: I confirm the final price in writing before starting. Travel is extra: €50 + VAT up to 40 km.','Ориентир: окончательную цену подтверждаю письменно до начала работ. Выезд отдельно: 50 € + IVA до 40 км.'),
 wa:t('Pedir este presupuesto por WhatsApp','Request this quote on WhatsApp','Запросить расчёт в WhatsApp'),
 hello:t('Hola, quiero presupuesto de','Hello, I would like a quote for','Здравствуйте, хочу расчёт:'),
 chosen:t('Elegido en la web','Selected on the website','Выбрано на сайте'),
 approx:t('Estimación web','Web estimate','Оценка на сайте')
};
var S=[
{id:'shelly',fields:[
 {l:t('Puntos de luz / interruptores','Lights / switches','Свет / выключатели'),o:qty(10,55)},
 {l:t('Persianas motorizadas','Motorised blinds','Жалюзи / рольставни'),o:qty(8,85)},
 {l:t('Enchufes o consumos controlados','Controlled sockets / loads','Управляемые розетки / нагрузки'),o:qty(6,45)},
 {l:t('Apple Home / Google Home y escenas','Apple Home / Google Home and scenes','Apple Home / Google Home и сценарии'),o:[{n:t('No','No','Нет'),p:0},{n:t('Sí, configuración completa','Yes, full set-up','Да, полная настройка'),p:60}]}
 ],name:t('Domótica con Shelly','Shelly home automation','Домашняя автоматика Shelly')},
{id:'wifi',fields:[
 {l:t('Diagnóstico de cobertura WiFi','WiFi coverage diagnosis','Диагностика покрытия WiFi'),o:[{n:t('No','No','Нет'),p:0},{n:t('Sí (1ª hora)','Yes (1st hour)','Да (1-й час)'),p:80}]},
 {l:t('Puntos de acceso (instalación y config.)','Access points (install & config)','Точки доступа (монтаж и настройка)'),o:qty(6,60)},
 {l:t('Líneas de cable de red Cat6 con tubo','Cat6 network cable runs in conduit','Кабельные линии Cat6 в трубе'),o:qty(10,90)},
 {l:t('Cámaras CCTV (instalación)','CCTV cameras (installation)','Камеры CCTV (монтаж)'),o:qty(8,70)},
 {l:t('Instalación de Starlink','Starlink installation','Установка Starlink'),o:[{n:t('No','No','Нет'),p:0},{n:t('Sí','Yes','Да'),p:120}]}
 ],extra:t('El equipo (puntos de acceso, cámaras, grabador) se presupuesta aparte según el modelo.','Equipment (access points, cameras, recorder) is quoted separately by model.','Оборудование (точки доступа, камеры, регистратор) считается отдельно по модели.'),name:t('Redes, WiFi y CCTV','Networks, WiFi and CCTV','Сети, WiFi и CCTV')},
{id:'ev',fields:[
 {l:t('Distancia del cuadro al cargador','Distance from panel to charger','Расстояние от щита до зарядки'),req:1,o:[{n:t('Hasta 10 m','Up to 10 m','До 10 м'),p:520},{n:t('10–20 m','10–20 m','10–20 м'),p:680},{n:t('20–30 m','20–30 m','20–30 м'),p:850},{n:t('Más de 30 m (desde)','Over 30 m (from)','Более 30 м (от)'),p:1050}]},
 {l:t('Alimentación','Supply','Питание'),o:[{n:t('Monofásica 7,4 kW','Single-phase 7.4 kW','Однофазная 7,4 кВт'),p:0},{n:t('Trifásica 11 kW o más','Three-phase 11 kW or more','Трёхфазная 11 кВт и более'),p:120}]},
 {l:t('Ubicación','Location','Место'),o:[{n:t('Vivienda o garaje propio','Home or private garage','Дом или свой гараж'),p:0},{n:t('Garaje comunitario','Community garage','Общий гараж'),p:120}]}
 ],extra:t('Incluye línea dedicada, magnetotérmico y diferencial tipo A/HI. El cargador no está incluido.','Includes dedicated line, breaker and type A/HI RCD. Charger not included.','Включает отдельную линию, автомат и УЗО типа A/HI. Сама зарядка не входит.'),name:t('Cargador para coche eléctrico','EV charger','Зарядка для электромобиля')},
{id:'electric',fields:[
 {l:t('Puntos nuevos (enchufe, interruptor, luz)','New points (socket, switch, light)','Новые точки (розетка, выключатель, свет)'),o:qty(20,35)},
 {l:t('Cuadro eléctrico nuevo','New electrical panel','Новый электрощит'),o:[{n:t('No','No','Нет'),p:0},{n:t('Pequeño (hasta ~8 circuitos)','Small (up to ~8 circuits)','Малый (до ~8 линий)'),p:450},{n:t('Mediano (hasta ~14)','Medium (up to ~14)','Средний (до ~14)'),p:650},{n:t('Grande (más de 14)','Large (over 14)','Большой (более 14)'),p:900}]},
 {l:t('Sustitución de automáticos / diferenciales','Replacing breakers / RCDs','Замена автоматов / УЗО'),o:qty(10,60)},
 {l:t('Diagnóstico de avería','Fault diagnosis','Диагностика неисправности'),o:[{n:t('No','No','Нет'),p:0},{n:t('Sí (1ª hora)','Yes (1st hour)','Да (1-й час)'),p:80}]}
 ],name:t('Instalación y reparación eléctrica','Electrical installation and repair','Электромонтаж и ремонт')},
{id:'solar',fields:[
 {l:t('Potencia fotovoltaica','PV power','Мощность солнечной станции'),req:1,o:[{n:'3 kWp',p:4500},{n:'5 kWp',p:6500},{n:'8 kWp',p:9800}]},
 {l:t('Batería','Battery','Батарея'),o:[{n:t('Sin batería','No battery','Без батареи'),p:0},{n:'5 kWh',p:2200},{n:'10 kWh',p:3800}]}
 ],extra:t('Llave en mano. Depende del tejado, la distancia al cuadro y la distribución: se confirma tras ver fotos o visitar.','Turnkey. Depends on roof, distance to the panel and layout: confirmed after photos or a visit.','Под ключ. Зависит от крыши, расстояния до щита и компоновки: уточняется по фото или после осмотра.'),name:t('Energía solar (PV)','Solar PV','Солнечная энергия (PV)')}
];
var tx=function(x){return typeof x==='string'?x:x[L];};
var fmt=function(n){return new Intl.NumberFormat(L==='es'?'es-ES':L==='ru'?'ru-RU':'en-GB').format(n);};
var cards=document.querySelectorAll('details.calc[data-svc]');
cards.forEach(function(d){
 var svc=S.filter(function(s){return s.id===d.dataset.svc;})[0]; if(!svc)return;
 d.querySelector('summary').textContent=tx(UI.summary);
 var body=d.querySelector('.calc-body'), sels=[];
 svc.fields.forEach(function(f,i){
  var lab=document.createElement('label'); lab.className='calc-row';
  var sp=document.createElement('span'); sp.textContent=tx(f.l); lab.appendChild(sp);
  var sel=document.createElement('select');
  if(f.req){var ph=document.createElement('option');ph.value='';ph.textContent=tx(UI.choose);sel.appendChild(ph);}
  f.o.forEach(function(o,j){var op=document.createElement('option');op.value=String(j);op.textContent=tx(o.n);sel.appendChild(op);});
  lab.appendChild(sel); body.appendChild(lab); sels.push(sel); sel.addEventListener('change',upd);
 });
 var out=document.createElement('div'); out.className='calc-out'; body.appendChild(out);
 var note=document.createElement('p'); note.className='calc-note'; note.textContent=(svc.extra?tx(svc.extra)+' ':'')+tx(UI.note); body.appendChild(note);
 function upd(){
  var total=0,lines=[],any=false,missing=false;
  svc.fields.forEach(function(f,i){
   var v=sels[i].value;
   if(v===''){ if(f.req)missing=true; return; }
   var o=f.o[+v]; total+=o.p;
   var name=tx(o.n); var isZero=(o.p===0)&&(/^(0|No|Нет)$/.test(name));
   if(o.p>0||(!isZero&&f.req)){any=true;lines.push(tx(f.l)+': '+name);}
   else if(!isZero&&o.p===0){lines.push(tx(f.l)+': '+name);}
  });
  if(!any||missing){out.innerHTML='<div class="calc-empty">'+tx(UI.empty)+'</div>';return;}
  var msg=tx(UI.hello)+' «'+tx(svc.name)+'».\n'+tx(UI.chosen)+':\n- '+lines.join('\n- ')+'\n'+tx(UI.approx)+': ≈ '+fmt(total)+' € '+tx(UI.vat);
  var href='https://wa.me/34671997560?text='+encodeURIComponent(msg);
  out.innerHTML='<div class="calc-total"><span>'+tx(UI.est)+'</span><strong>≈ '+fmt(total)+' € <small>'+tx(UI.vat)+'</small></strong></div><a class="cta-btn" target="_blank" rel="noopener" href="'+href+'">'+tx(UI.wa)+'</a>';
 }
 upd();
});
})();
