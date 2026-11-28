/* Evolink price calculator. PRICES: edit numbers only. All prices are client prices, EUR, excl. IVA. */
(function(){
var BASE=(document.currentScript&&document.currentScript.src||'').replace(/calc\.js.*$/,'');
var L=(document.documentElement.lang||'es').slice(0,2); if(!{es:1,en:1,ru:1}[L])L='es';
var t=function(es,en,ru){return {es:es,en:en,ru:ru};};
var qty=function(max,unit){var o=[];for(var i=0;i<=max;i++)o.push({n:String(i),p:i*unit});return o;};
var UI={
 summary:t('Calcular precio','Estimate price','Рассчитать цену'),
 moreinfo:t('Más información','More info','Подробнее'),
 choose:t('Elige…','Choose…','Выберите…'),
 empty:t('Elige opciones para ver una estimación.','Pick options to see an estimate.','Выберите параметры, чтобы увидеть оценку.'),
 est:t('Estimación orientativa','Approximate estimate','Ориентировочная оценка'),
 vat:t('+ IVA','+ VAT','+ IVA'),
 note:t('Orientativo: el precio final lo confirmo por escrito antes de empezar. El desplazamiento se acuerda en el presupuesto.','Approximate: I confirm the final price in writing before starting. Travel is agreed in the quote.','Ориентир: окончательную цену подтверждаю письменно до начала работ. Выезд согласуется в расчёте.'),
 wa:t('Pedir este presupuesto por WhatsApp','Request this quote on WhatsApp','Запросить расчёт в WhatsApp'),
 hello:t('Hola, quiero presupuesto de','Hello, I would like a quote for','Здравствуйте, хочу расчёт:'),
 chosen:t('Elegido en la web','Selected on the website','Выбрано на сайте'),
 approx:t('Estimación web','Web estimate','Оценка на сайте')
};
var INFO={wifi:{
 h:t('Qué instalamos','What we install','Что устанавливаем'),
 how:t('Antes de instalar revisamos la cobertura y proponemos dónde colocar cada equipo. La velocidad real depende de tu conexión a internet y de la vivienda.','Before installing we check coverage and suggest where each unit should go. Real speed depends on your internet connection and your property.','Перед установкой проверяем покрытие и предлагаем, где разместить каждое устройство. Реальная скорость зависит от вашего интернета и дома.'),
 items:[
 [t('WiFi Mesh y WiFi 7','Mesh WiFi & WiFi 7','Mesh WiFi и WiFi 7'),t('WiFi 7 es el estándar más reciente: más rápido y estable con dispositivos compatibles. Mesh une varios puntos en una sola red: pasas de una habitación a otra sin perder la conexión.','WiFi 7 is the latest standard: faster and more stable on compatible devices. Mesh links several units into one network, so you move between rooms without dropping the connection.','WiFi 7 — новейший стандарт: выше скорость и стабильнее связь на совместимых устройствах. Mesh объединяет несколько точек в одну сеть: вы переходите из комнаты в комнату практически без обрывов.'),['img/wifi-mesh7.jpg','img/wifi-deco.jpg']],
 ['Starlink',t('Internet donde no llega la fibra; acceso autónomo a internet incluso en los lugares más remotos','Internet where there is no fibre; independent internet access even in the most remote places','Интернет там, где нет оптики; автономный доступ к интернету даже в самых удалённых местах'),'img/wifi-starlink.jpg'],
 [t('Cámaras de videovigilancia','CCTV cameras','Камеры видеонаблюдения'),t('Cámaras IP con grabación de vídeo de alta calidad y acceso desde el móvil; archivo en tu propio servidor o en la nube','IP cameras with high-quality video recording and phone access; archive stored on your own server or in the cloud','IP-камеры с записью видео высокого качества и доступом с телефона, хранение архива на вашем сервере или в облаке'),'img/wifi-cctv.jpg'],
 [t('Cableado y armario de red','Network cabling and cabinet','Кабельная сеть и сетевой шкаф'),t('Cableado de red, panel de conexiones, switch PoE y armario ordenado','Network cabling, patch panel, PoE switch and a tidy cabinet','Прокладка сети, патч-панель, PoE-коммутатор и аккуратный шкаф'),'img/wifi-rack.jpg']
 ]},
shelly:{
 h:t('Qué controlamos y con qué','What we control and with what','Что управляем и какие модули ставим'),
 how:t('Los módulos se instalan detrás del interruptor que ya tienes: sin obras ni rozas, por WiFi, compatibles con Apple Home y Google Home, y se controlan también desde la app propia de Shelly. El interruptor de pared sigue funcionando.','Modules fit behind your existing switch: no building work, WiFi-based, works with Apple Home and Google Home, and can also be controlled in the Shelly app. Your wall switch keeps working.','Модули ставятся за уже существующий выключатель: без штроб и ремонта, по WiFi, работают с Apple Home и Google Home, а также в собственном приложении Shelly. Обычный выключатель продолжает работать.'),
 items:[
 ['Shelly 1 / 1PM',t('Una luz o una carga (el 1PM muestra el consumo)','One light or load (1PM shows consumption)','Один свет или одна нагрузка (1PM показывает потребление)')],
 ['Shelly 2PM',t('Persianas, toldos y cortinas motorizadas','Motorised blinds, shutters and awnings','Жалюзи, рольставни, маркизы (мотор)')],
 ['Shelly Dimmer',t('Regula la intensidad de la luz','Dims the light','Диммирует свет')],
 ['Shelly DALI Dimmer',t('Líneas de iluminación DALI','DALI lighting lines','Линии освещения DALI')],
 ['Shelly i4 Mini',t('Convierte pulsadores en escenas y automatismos','Turns wall buttons into scenes and automations','Превращает кнопки в сценарии и автоматизации')],
 ['Shelly Plug PM',t('Enchufe inteligente con medición de consumo','Smart plug with energy metering','Умная розетка с замером потребления')],
 ['Shelly EM',t('Medidor de energía de toda la vivienda','Whole-home energy meter','Учёт энергии всей квартиры')],
 ['Shelly Flood',t('Sensor de inundación','Flood sensor','Датчик протечки')],
 [t('Sensores','Sensors','Датчики'),t('Puertas, movimiento, temperatura','Doors, motion, temperature','Двери, движение, температура')]
 ]}};
var INFO_ONLY=true; /* true: show only the info block (no prices/calculator) */
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
 {l:t('Cargador (precio del equipo + IVA)','Charger (equipment price + VAT)','Зарядка (цена оборудования + IVA)'),dep:{on:1,map:[[{n:t("Ya tengo cargador / lo suministra el cliente","I already have a charger / customer supplies it","Зарядка уже есть / привозит клиент"),p:0},{n:t("V2C Trydan 7,4 kW con protecciones — 655 €","V2C Trydan 7.4 kW with protection kit — €655","V2C Trydan 7,4 кВт с защитами — 655 €"),p:655},{n:"Scame 7 kW Tipo 2 — 480 €",p:480},{n:"Proxe 7 kW Tipo 2 — 510 €",p:510},{n:"Huawei 7,4 kW WiFi — 415 €",p:415},{n:"Schneider EVlink Home 7,4 kW — 415 €",p:415},{n:"Schneider Charge 7,4 kW — 615 €",p:615},{n:"Simon 7,4 kW — 810 €",p:810}],[{n:t("Ya tengo cargador / lo suministra el cliente","I already have a charger / customer supplies it","Зарядка уже есть / привозит клиент"),p:0},{n:t("V2C Trydan 22 kW con cuadro de protecciones — 870 €","V2C Trydan 22 kW with protection board — €870","V2C Trydan 22 кВт с щитком защит — 870 €"),p:870},{n:"Huawei 22 kW WiFi — 415 €",p:415},{n:"Policharger ON-T23 22 kW — 640 €",p:640}]]},o:[]},
 {l:t('Ubicación','Location','Место'),o:[{n:t('Vivienda o garaje propio','Home or private garage','Дом или свой гараж'),p:0},{n:t('Garaje comunitario','Community garage','Общий гараж'),p:120}]}
 ],extra:t('Incluye línea dedicada, magnetotérmico y diferencial tipo A/HI. El cargador solo se suma si lo eliges en la lista.','Includes dedicated line, breaker and type A/HI RCD. A charger is added only if you pick one from the list.','Включает отдельную линию, автомат и УЗО типа A/HI. Зарядка добавляется, только если выбрать её в списке.'),name:t('Cargador para coche eléctrico','EV charger','Зарядка для электромобиля')},
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
cards.forEach(function(d){var box=d.closest('.service');if(!box)return;box.classList.add('has-calc');
 box.addEventListener('click',function(e){if(e.target.closest('summary,a,select,label,.calc-body'))return;d.open=!d.open;});});
cards.forEach(function(d){
 var svc=S.filter(function(s){return s.id===d.dataset.svc;})[0]; if(!svc)return;
 d.querySelector('summary').textContent=tx(INFO_ONLY?UI.moreinfo:UI.summary);
 var body=d.querySelector('.calc-body'), sels=[];
 var inf=INFO[svc.id];
 if(inf){var ib=document.createElement('div');ib.className='calc-info';
  var h=document.createElement('h4');h.textContent=tx(inf.h);ib.appendChild(h);
  var ul=document.createElement('ul');inf.items.forEach(function(it){var li=document.createElement('li');var b=document.createElement('b');b.textContent=tx(it[0]);
   if(it[2]){li.className='has-img'+(Array.isArray(it[2])?' multi':'');var th=document.createElement('div');th.className='thumbs';[].concat(it[2]).forEach(function(src){var im=document.createElement('img');im.src=BASE+src;im.alt='';im.width=88;im.height=88;im.loading='lazy';th.appendChild(im);});li.appendChild(th);var dv=document.createElement('div');dv.appendChild(b);var sp=document.createElement('span');sp.textContent=tx(it[1]);dv.appendChild(sp);li.appendChild(dv);}
   else{li.appendChild(b);li.appendChild(document.createTextNode(' — '+tx(it[1])));}
   ul.appendChild(li);});ib.appendChild(ul);
  var p=document.createElement('p');p.textContent=tx(inf.how);ib.appendChild(p);body.appendChild(ib);}
 (INFO_ONLY?[]:svc.fields).forEach(function(f,i){
  var lab=document.createElement('label'); lab.className='calc-row';
  var sp=document.createElement('span'); sp.textContent=tx(f.l); lab.appendChild(sp);
  var sel=document.createElement('select');
  var fill=function(){sel.innerHTML='';if(f.req){var ph=document.createElement('option');ph.value='';ph.textContent=tx(UI.choose);sel.appendChild(ph);}
   f.o.forEach(function(o,j){var op=document.createElement('option');op.value=String(j);op.textContent=tx(o.n);sel.appendChild(op);});};
  lab.appendChild(sel); body.appendChild(lab); sels.push(sel); sel.addEventListener('change',upd);
  if(f.dep){var setList=function(){f.o=f.dep.map[+sels[f.dep.on].value];fill();};setList();sels[f.dep.on].addEventListener('change',function(){setList();upd();});}
  else fill();
 });
 if(INFO_ONLY)return;
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
