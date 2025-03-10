/*! For license information please see chunk-BBPN4YHW.js.LICENSE.txt */
import{a as S}from"./chunk-IPMQ7HU7.js";import{a as j}from"./chunk-ZFTFDHK4.js";import{a as D}from"./chunk-NNHN6WUY.js";import{a as V}from"./chunk-T7ERZ2CJ.js";import{b as T,c as B,d as L}from"./chunk-GSNDLQ4C.js";import{d as O}from"./chunk-BKSIEBAA.js";import{a as x}from"./chunk-VTVHUB7E.js";import{a as c,d as l}from"./chunk-JMSSU44E.js";import{a as E}from"./chunk-4UYSGV57.js";import{a as m}from"./chunk-VLPNAR64.js";import{a as _}from"./chunk-GE5NEIZC.js";import{e as d}from"./chunk-35CVRQTC.js";var q=new c,M=new c;function U(e){let t=e.center;M=c.multiplyByScalar(e.ellipsoid.geodeticSurfaceNormal(t,M),e.height,M),M=c.add(t,M,M);let i=new O(M,e.semiMajorAxis),r=S.computeEllipsePositions(e,!1,!0).outerPositions,n=new V({position:new L({componentDatatype:x.DOUBLE,componentsPerAttribute:3,values:S.raisePositionsToHeight(r,e,!1)})}),o=r.length/3,s=D.createTypedArray(o,2*o),a=0;for(let e=0;e<o;++e)s[a++]=e,s[a++]=(e+1)%o;return{boundingSphere:i,attributes:n,indices:s}}var N=new O,P=new O;function R(e){let t=e.center,i=e.ellipsoid,r=e.semiMajorAxis,n=c.multiplyByScalar(i.geodeticSurfaceNormal(t,q),e.height,q);N.center=c.add(t,n,N.center),N.radius=r,n=c.multiplyByScalar(i.geodeticSurfaceNormal(t,n),e.extrudedHeight,n),P.center=c.add(t,n,P.center),P.radius=r;let o=S.computeEllipsePositions(e,!1,!0).outerPositions,s=new V({position:new L({componentDatatype:x.DOUBLE,componentsPerAttribute:3,values:S.raisePositionsToHeight(o,e,!0)})});o=s.position.values;let a=O.union(N,P),l=o.length/3;if(d(e.offsetAttribute)){let t=new Uint8Array(l);if(e.offsetAttribute===j.TOP)t=t.fill(1,0,l/2);else{let i=e.offsetAttribute===j.NONE?0:1;t=t.fill(i)}s.applyOffset=new L({componentDatatype:x.UNSIGNED_BYTE,componentsPerAttribute:1,values:t})}let u=m(e.numberOfVerticalLines,16);u=E.clamp(u,0,l/2);let f=D.createTypedArray(l,2*l+2*u);l/=2;let h,p,_=0;for(h=0;h<l;++h)f[_++]=h,f[_++]=(h+1)%l,f[_++]=h+l,f[_++]=(h+1)%l+l;if(u>0){let e=Math.min(u,l);p=Math.round(l/e);let t=Math.min(p*u,l);for(h=0;h<t;h+=p)f[_++]=h,f[_++]=h+l}return{boundingSphere:a,attributes:s,indices:f}}function w(e){let t=(e=m(e,m.EMPTY_OBJECT)).center,i=m(e.ellipsoid,l.default),r=e.semiMajorAxis,n=e.semiMinorAxis,o=m(e.granularity,E.RADIANS_PER_DEGREE);if(!d(t))throw new _("center is required.");if(!d(r))throw new _("semiMajorAxis is required.");if(!d(n))throw new _("semiMinorAxis is required.");if(r<n)throw new _("semiMajorAxis must be greater than or equal to the semiMinorAxis.");if(o<=0)throw new _("granularity must be greater than zero.");let s=m(e.height,0),a=m(e.extrudedHeight,s);this._center=c.clone(t),this._semiMajorAxis=r,this._semiMinorAxis=n,this._ellipsoid=l.clone(i),this._rotation=m(e.rotation,0),this._height=Math.max(a,s),this._granularity=o,this._extrudedHeight=Math.min(a,s),this._numberOfVerticalLines=Math.max(m(e.numberOfVerticalLines,16),0),this._offsetAttribute=e.offsetAttribute,this._workerName="createEllipseOutlineGeometry"}w.packedLength=c.packedLength+l.packedLength+8,w.pack=function(e,t,i){if(!d(e))throw new _("value is required");if(!d(t))throw new _("array is required");return i=m(i,0),c.pack(e._center,t,i),i+=c.packedLength,l.pack(e._ellipsoid,t,i),i+=l.packedLength,t[i++]=e._semiMajorAxis,t[i++]=e._semiMinorAxis,t[i++]=e._rotation,t[i++]=e._height,t[i++]=e._granularity,t[i++]=e._extrudedHeight,t[i++]=e._numberOfVerticalLines,t[i]=m(e._offsetAttribute,-1),t};var y=new c,C=new l,b={center:y,ellipsoid:C,semiMajorAxis:void 0,semiMinorAxis:void 0,rotation:void 0,height:void 0,granularity:void 0,extrudedHeight:void 0,numberOfVerticalLines:void 0,offsetAttribute:void 0};w.unpack=function(e,t,i){if(!d(e))throw new _("array is required");t=m(t,0);let r=c.unpack(e,t,y);t+=c.packedLength;let n=l.unpack(e,t,C);t+=l.packedLength;let o=e[t++],s=e[t++],a=e[t++],u=e[t++],f=e[t++],h=e[t++],p=e[t++],A=e[t];return d(i)?(i._center=c.clone(r,i._center),i._ellipsoid=l.clone(n,i._ellipsoid),i._semiMajorAxis=o,i._semiMinorAxis=s,i._rotation=a,i._height=u,i._granularity=f,i._extrudedHeight=h,i._numberOfVerticalLines=p,i._offsetAttribute=-1===A?void 0:A,i):(b.height=u,b.extrudedHeight=h,b.granularity=f,b.rotation=a,b.semiMajorAxis=o,b.semiMinorAxis=s,b.numberOfVerticalLines=p,b.offsetAttribute=-1===A?void 0:A,new w(b))},w.createGeometry=function(e){if(e._semiMajorAxis<=0||e._semiMinorAxis<=0)return;let t=e._height,i=e._extrudedHeight,r=!E.equalsEpsilon(t,i,0,E.EPSILON2);e._center=e._ellipsoid.scaleToGeodeticSurface(e._center,e._center);let n,o={center:e._center,semiMajorAxis:e._semiMajorAxis,semiMinorAxis:e._semiMinorAxis,ellipsoid:e._ellipsoid,rotation:e._rotation,height:t,granularity:e._granularity,numberOfVerticalLines:e._numberOfVerticalLines};if(r)o.extrudedHeight=i,o.offsetAttribute=e._offsetAttribute,n=R(o);else if(n=U(o),d(e._offsetAttribute)){let t=n.attributes.position.values.length,i=e._offsetAttribute===j.NONE?0:1,r=new Uint8Array(t/3).fill(i);n.attributes.applyOffset=new L({componentDatatype:x.UNSIGNED_BYTE,componentsPerAttribute:1,values:r})}return new B({attributes:n.attributes,indices:n.indices,primitiveType:T.LINES,boundingSphere:n.boundingSphere,offsetAttribute:e._offsetAttribute})};var ie=w;export{ie as a};