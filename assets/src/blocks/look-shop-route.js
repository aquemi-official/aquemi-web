/* Look "shop-route" -> ShopRoute (design-system/components/ShopRoute): a fabrication sequence as the route a spool
   takes through the shop, drawn as a floor plan on a limestone sheet. Each step is a bay (three across, the second row
   returning right to left, as a U-shaped shop runs) with its plan furniture drawn small in the corner (desk, pipe
   rack, test bench, joining machine, test rig, rinse and dispatch door); one route line enters at the top left, runs
   through every bay, down the right-hand aisle and back out at the bottom left. Each bay has its stop on the route;
   a hold point is a gate on the route after its bay with a stamp naming who signs; a step whose text names a witness
   point carries an eye marker on its stop and a "Witness point" tag (the words move out of the sentence, unchanged).
   Fields (a steps block): h, intro, items [{t, d, hold, link, bay}]. bay (optional): plan, receive, qualify, join,
   test, clean (default from the step's words). Phones: the bays stack, the route runs down the left edge. */
LOOKS['shop-route']=(function(){
 function P(d,c){return '<path class="aq-shop-route'+'__'+(c||'ln')+'" d="'+d+'"/>'}
 function R(x,y,w,h,c){return '<rect class="aq-shop-route'+'__'+(c||'ln')+'" x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'"/>'}
 var FURN={
  plan:function(){return R(10,20,70,40)+P('M18 30H60M18 38H52M18 46H64','thin')+'<circle class="aq-shop-route__ln" cx="45" cy="74" r="10"/>'+R(90,24,40,52,'sheet')+P('M98 34H122M98 42H116M98 50H124','thin')},
  receive:function(){var o='';for(var i=0;i<6;i++)o+=R(6,14+i*11,124,6);return o+R(14,84,40,24,'thin')+P('M14 96H54M34 84V108','thin')+R(70,84,40,24,'thin')+P('M70 96H110M90 84V108','thin')},
  qualify:function(){return R(8,20,120,46)+P('M30 36H52C60 36 62 50 70 50H96','fix')+P('M30 44H50C58 44 60 58 70 58H96','fix')+'<circle class="aq-shop-route__ln" cx="112" cy="88" r="12"/>'+P('M112 88L120 80','thin')},
  join:function(){return R(4,34,128,30)+R(16,26,12,46,'sheet')+R(34,26,12,46,'sheet')+R(84,26,12,46,'sheet')+R(102,26,12,46,'sheet')+P('M0 49H62M70 49H136','fix')+P('M66 38V60','ln')+R(52,82,28,22)+P('M58 90H74M58 96H70','thin')},
  test:function(){return P('M8 40H100V90H40','fix')+R(2,32,10,16)+R(34,84,10,16)+'<circle class="aq-shop-route__ln" cx="114" cy="40" r="14"/>'+P('M114 40L122 31M104 40H100','thin')+P('M60 100V114M52 114H68','thin')},
  clean:function(){return '<circle class="aq-shop-route__ln" cx="34" cy="40" r="26"/>'+P('M60 40H96C110 40 110 70 96 76','fix')+P('M88 86L96 76L104 86','thin')+R(4,92,124,10,'door')}
 };
 function pick(t){t=String(t||'');return /plan/i.test(t)?'plan':/receive|material/i.test(t)?'receive':/qualif|test joint/i.test(t)?'qualify':/join|weld|record/i.test(t)?'join':/test|survey/i.test(t)?'test':/clean|turn|rinse/i.test(t)?'clean':'plan'}
 var WIT=/\s*Witness point\.\s*/;
 return function(b,H){var I=b.items||[],n=I.length,cols=Math.max(1,Math.ceil(n/2)),rows=n>cols?2:1;
  var bays=I.map(function(it,i){var row=i<cols?1:2,col=row===1?i+1:cols-(i-cols),f=FURN[it.bay]?it.bay:pick(it.t),d=String(it.d||''),wit=WIT.test(d),num=(i<9?'0':'')+(i+1);
   if(wit)d=d.replace(WIT,' ').trim();
   return '<li class="aq-shop-route__bay'+(it.hold?' is-hold':'')+(wit?' is-wit':'')+(row===2?' is-back':'')+(col===cols?' is-rc':'')+'" style="grid-row:'+row+';grid-column:'+col+';--i:'+i+'">'
    +'<svg class="aq-shop-route__furn" viewBox="0 0 136 116" aria-hidden="true" focusable="false">'+FURN[f]()+'</svg>'
    +'<span class="aq-shop-route__n" aria-hidden="true">'+num+'</span>'
    +'<h3 class="aq-shop-route__t">'+stepTitle(it)+'</h3>'+(d?'<p class="aq-shop-route__d">'+tx(d)+'</p>':'')
    +'<p class="aq-shop-route__tags">'+(wit?'<span class="aq-shop-route__wit">Witness point</span>':'')
     +(it.hold?'<span class="aq-shop-route__stamp"><span class="aq-shop-route__stamp-k">Hold point</span> <span>Signed by '+stepWho(it.hold)+'</span></span>':'')+'</p>'
    +'<span class="aq-shop-route__stop" aria-hidden="true"></span>'
    +'</li>'}).join('');
  /* the route: a lane through each row, joined down the right-hand aisle; gates after hold bays */
  var lanes=rows===2?'<span class="aq-shop-route__seg aq-shop-route__seg--a"></span><span class="aq-shop-route__seg aq-shop-route__seg--b"></span><span class="aq-shop-route__seg aq-shop-route__seg--c"></span>':'<span class="aq-shop-route__seg aq-shop-route__seg--a aq-shop-route__seg--solo"></span>';
  var gates=I.map(function(it,i){if(!it.hold||i===n-1)return '';var row=i<cols?1:2,c=row===1?i+1:cols-(i-cols),x=row===1?c/cols*100:(c-1)/cols*100;if(row===1&&i===cols-1)return '';
   return '<span class="aq-shop-route__gate'+(row===2?' is-back':'')+'" style="left:'+x.toFixed(3)+'%"></span>'}).join('');
  return sec(H+'<div class="aq-shop-route" data-theme="light" style="--cols:'+cols+';--rows:'+rows+'">'
   +'<div class="aq-shop-route__route" aria-hidden="true">'+lanes+gates+'<span class="aq-shop-route__spool"></span></div>'
   +'<ol class="aq-shop-route__bays">'+bays+'</ol>'
   +'<span class="aq-shop-route__door aq-shop-route__door--in" aria-hidden="true"></span>'+(rows===2?'<span class="aq-shop-route__door aq-shop-route__door--out" aria-hidden="true"></span>':'')
   +'</div>','aq-shop-route-sec')}
})();
