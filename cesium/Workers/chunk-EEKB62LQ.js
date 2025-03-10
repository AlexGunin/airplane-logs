/*! For license information please see chunk-EEKB62LQ.js.LICENSE.txt */
import{a as p,b as P,d as q}from"./chunk-JMSSU44E.js";import{a}from"./chunk-4UYSGV57.js";import{a as T}from"./chunk-VLPNAR64.js";import{a as I,b as g}from"./chunk-GE5NEIZC.js";import{e as l}from"./chunk-35CVRQTC.js";function y(t,i,e){if(0===t)return i*e;let a=t*t,n=a*a,s=n*a,l=s*a,h=l*a,d=h*a,u=e;return i*((1-a/4-3*n/64-5*s/256-175*l/16384-441*h/65536-4851*d/1048576)*u-(3*a/8+3*n/32+45*s/1024+105*l/4096+2205*h/131072+6237*d/524288)*Math.sin(2*u)+(15*n/256+45*s/1024+525*l/16384+1575*h/65536+155925*d/8388608)*Math.sin(4*u)-(35*s/3072+175*l/12288+3675*h/262144+13475*d/1048576)*Math.sin(6*u)+(315*l/131072+2205*h/524288+43659*d/8388608)*Math.sin(8*u)-(693*h/1310720+6237*d/5242880)*Math.sin(10*u)+1001*d/8388608*Math.sin(12*u))}function z(t,i,e){let a=t/e;if(0===i)return a;let n=a*a,s=n*a,l=s*a,h=i*i,d=h*h,u=d*h,o=u*h,r=o*h,c=r*h,g=Math.sin(2*a),_=Math.cos(2*a),p=Math.sin(4*a),M=Math.cos(4*a),f=Math.sin(6*a),m=Math.cos(6*a),P=Math.sin(8*a),O=Math.cos(8*a),E=Math.sin(10*a);return a+a*h/4+7*a*d/64+15*a*u/256+579*a*o/16384+1515*a*r/65536+16837*a*c/1048576+(3*a*d/16+45*a*u/256-a*(32*n-561)*o/4096-a*(232*n-1677)*r/16384+a*(399985-90560*n+512*l)*c/5242880)*_+(21*a*u/256+483*a*o/4096-a*(224*n-1969)*r/16384-a*(33152*n-112599)*c/1048576)*M+(151*a*o/4096+4681*a*r/65536+1479*a*c/16384-453*s*c/32768)*m+(1097*a*r/65536+42783*a*c/1048576)*O+8011*a*c/1048576*Math.cos(10*a)+(3*h/8+3*d/16+213*u/2048-3*n*u/64+255*o/4096-33*n*o/512+20861*r/524288-33*n*r/512+l*r/1024+28273*c/1048576-471*n*c/8192+9*l*c/4096)*g+(21*d/256+21*u/256+533*o/8192-21*n*o/512+197*r/4096-315*n*r/4096+584039*c/16777216-12517*n*c/131072+7*l*c/2048)*p+(151*u/6144+151*o/4096+5019*r/131072-453*n*r/16384+26965*c/786432-8607*n*c/131072)*f+(1097*o/131072+1097*r/65536+225797*c/10485760-1097*n*c/65536)*P+(8011*r/2621440+8011*c/1048576)*E+293393*c/251658240*Math.sin(12*a)}function O(t,i){if(0===t)return Math.log(Math.tan(.5*(a.PI_OVER_TWO+i)));let e=t*Math.sin(i);return Math.log(Math.tan(.5*(a.PI_OVER_TWO+i)))-t/2*Math.log((1+e)/(1-e))}function k(t,i,e,n,s){let l=O(t._ellipticity,e),h=O(t._ellipticity,s);return Math.atan2(a.negativePiToPi(n-i),h-l)}function A(t,i,e,n,s,l,h){let d=t._heading,u=l-n,o=0;if(a.equalsEpsilon(Math.abs(d),a.PI_OVER_TWO,a.EPSILON8))if(i===e)o=i*Math.cos(s)*a.negativePiToPi(u);else{let e=Math.sin(s);o=i*Math.cos(s)*a.negativePiToPi(u)/Math.sqrt(1-t._ellipticitySquared*e*e)}else{let e=y(t._ellipticity,i,s);o=(y(t._ellipticity,i,h)-e)/Math.cos(d)}return Math.abs(o)}var B=new p,w=new p;function D(t,i,e,a){let n=p.normalize(a.cartographicToCartesian(i,w),B),s=p.normalize(a.cartographicToCartesian(e,w),w);g.typeOf.number.greaterThanOrEquals("value",Math.abs(Math.abs(p.angleBetween(n,s))-Math.PI),.0125);let l=a.maximumRadius,h=a.minimumRadius,d=l*l,u=h*h;t._ellipticitySquared=(d-u)/d,t._ellipticity=Math.sqrt(t._ellipticitySquared),t._start=P.clone(i,t._start),t._start.height=0,t._end=P.clone(e,t._end),t._end.height=0,t._heading=k(t,i.longitude,i.latitude,e.longitude,e.latitude),t._distance=A(t,a.maximumRadius,a.minimumRadius,i.longitude,i.latitude,e.longitude,e.latitude)}function v(t,i,e,n,s,h){if(0===e)return P.clone(t,h);let d,u,o,r=s*s;if(Math.abs(a.PI_OVER_TWO-Math.abs(i))>a.EPSILON8)if(u=z(y(s,n,t.latitude)+e*Math.cos(i),s,n),Math.abs(i)<a.EPSILON10)d=a.negativePiToPi(t.longitude);else{let e=O(s,t.latitude),n=O(s,u);o=Math.tan(i)*(n-e),d=a.negativePiToPi(t.longitude+o)}else{let l;if(u=t.latitude,0===s)l=n*Math.cos(t.latitude);else{let i=Math.sin(t.latitude);l=n*Math.cos(t.latitude)/Math.sqrt(1-r*i*i)}o=e/l,d=i>0?a.negativePiToPi(t.longitude+o):a.negativePiToPi(t.longitude-o)}return l(h)?(h.longitude=d,h.latitude=u,h.height=0,h):new P(d,u,0)}function m(t,i,e){let a=T(e,q.default);this._ellipsoid=a,this._start=new P,this._end=new P,this._heading=void 0,this._distance=void 0,this._ellipticity=void 0,this._ellipticitySquared=void 0,l(t)&&l(i)&&D(this,t,i,a)}Object.defineProperties(m.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},surfaceDistance:{get:function(){return g.defined("distance",this._distance),this._distance}},start:{get:function(){return this._start}},end:{get:function(){return this._end}},heading:{get:function(){return g.defined("distance",this._distance),this._heading}}}),m.fromStartHeadingDistance=function(t,i,e,n,s){g.defined("start",t),g.defined("heading",i),g.defined("distance",e),g.typeOf.number.greaterThan("distance",e,0);let h=T(n,q.default),d=h.maximumRadius,u=h.minimumRadius,o=d*d,r=u*u,c=Math.sqrt((o-r)/o),_=v(t,i=a.negativePiToPi(i),e,h.maximumRadius,c);return!l(s)||l(n)&&!n.equals(s.ellipsoid)?new m(t,_,h):(s.setEndPoints(t,_),s)},m.prototype.setEndPoints=function(t,i){g.defined("start",t),g.defined("end",i),D(this,t,i,this._ellipsoid)},m.prototype.interpolateUsingFraction=function(t,i){return this.interpolateUsingSurfaceDistance(t*this._distance,i)},m.prototype.interpolateUsingSurfaceDistance=function(t,i){if(g.typeOf.number("distance",t),!l(this._distance)||0===this._distance)throw new I("EllipsoidRhumbLine must have distinct start and end set.");return v(this._start,this._heading,t,this._ellipsoid.maximumRadius,this._ellipticity,i)},m.prototype.findIntersectionWithLongitude=function(t,i){if(g.typeOf.number("intersectionLongitude",t),!l(this._distance)||0===this._distance)throw new I("EllipsoidRhumbLine must have distinct start and end set.");let e=this._ellipticity,n=this._heading,s=Math.abs(n),h=this._start;if(t=a.negativePiToPi(t),a.equalsEpsilon(Math.abs(t),Math.PI,a.EPSILON14)&&(t=a.sign(h.longitude)*Math.PI),l(i)||(i=new P),Math.abs(a.PI_OVER_TWO-s)<=a.EPSILON8)return i.longitude=t,i.latitude=h.latitude,i.height=0,i;if(a.equalsEpsilon(Math.abs(a.PI_OVER_TWO-s),a.PI_OVER_TWO,a.EPSILON8))return a.equalsEpsilon(t,h.longitude,a.EPSILON12)?void 0:(i.longitude=t,i.latitude=a.PI_OVER_TWO*a.sign(a.PI_OVER_TWO-n),i.height=0,i);let d,u=h.latitude,o=e*Math.sin(u),r=Math.tan(.5*(a.PI_OVER_TWO+u))*Math.exp((t-h.longitude)/Math.tan(n)),c=(1+o)/(1-o),_=h.latitude;do{d=_;let t=e*Math.sin(d),i=(1+t)/(1-t);_=2*Math.atan(r*Math.pow(i/c,e/2))-a.PI_OVER_TWO}while(!a.equalsEpsilon(_,d,a.EPSILON12));return i.longitude=t,i.latitude=_,i.height=0,i},m.prototype.findIntersectionWithLatitude=function(t,i){if(g.typeOf.number("intersectionLatitude",t),!l(this._distance)||0===this._distance)throw new I("EllipsoidRhumbLine must have distinct start and end set.");let e=this._ellipticity,n=this._heading,s=this._start;if(a.equalsEpsilon(Math.abs(n),a.PI_OVER_TWO,a.EPSILON8))return;let h=O(e,s.latitude),d=O(e,t),u=Math.tan(n)*(d-h),o=a.negativePiToPi(s.longitude+u);return l(i)?(i.longitude=o,i.latitude=t,i.height=0,i):new P(o,t,0)};var $=m;export{$ as a};