/*! For license information please see chunk-IPMQ7HU7.js.LICENSE.txt */
import{f as C}from"./chunk-YWRPWWKI.js";import{a as n,e as b}from"./chunk-JMSSU44E.js";import{a as w}from"./chunk-4UYSGV57.js";var j={},q=new n,L=new n,Q=new C,G=new b;function W(e,t,r,a,o,i,l,s,y,c){let m=e+t;n.multiplyByScalar(a,Math.cos(m),q),n.multiplyByScalar(r,Math.sin(m),L),n.add(q,L,q);let u=Math.cos(e);u*=u;let w=Math.sin(e);w*=w;let x=i/Math.sqrt(l*u+o*w)/s;return C.fromAxisAngle(q,x,Q),b.fromQuaternion(Q,G),b.multiplyByVector(G,y,c),n.normalize(c,c),n.multiplyByScalar(c,s,c),c}var U=new n,Z=new n,N=new n,v=new n;j.raisePositionsToHeight=function(e,t,r){let a=t.ellipsoid,o=t.height,i=t.extrudedHeight,l=r?e.length/3*2:e.length/3,s=new Float64Array(3*l),y=e.length,c=r?y:0;for(let t=0;t<y;t+=3){let l=t+1,y=t+2,m=n.fromArray(e,t,U);a.scaleToGeodeticSurface(m,m);let u=n.clone(m,Z),w=a.geodeticSurfaceNormal(m,v),x=n.multiplyByScalar(w,o,N);n.add(m,x,m),r&&(n.multiplyByScalar(w,i,x),n.add(u,x,u),s[t+c]=u.x,s[l+c]=u.y,s[y+c]=u.z),s[t]=m.x,s[l]=m.y,s[y]=m.z}return s};var D=new n,J=new n,K=new n;j.computeEllipsePositions=function(e,t,r){let a=e.semiMinorAxis,o=e.semiMajorAxis,i=e.rotation,l=e.center,s=8*e.granularity,y=a*a,c=o*o,m=o*a,u=n.magnitude(l),x=n.normalize(l,D),h=n.cross(n.UNIT_Z,l,J);h=n.normalize(h,h);let f=n.cross(x,h,K),z=1+Math.ceil(w.PI_OVER_TWO/s),_=w.PI_OVER_TWO/(z-1),p=w.PI_OVER_TWO-z*_;p<0&&(z-=Math.ceil(Math.abs(p)/_));let O,P,d,M,I,T=t?new Array(z*(z+2)*2*3):void 0,g=0,E=U,S=Z,V=4*z*3,R=V-1,j=0,v=r?new Array(V):void 0;for(p=w.PI_OVER_TWO,E=W(p,i,f,h,y,m,c,u,x,E),t&&(T[g++]=E.x,T[g++]=E.y,T[g++]=E.z),r&&(v[R--]=E.z,v[R--]=E.y,v[R--]=E.x),p=w.PI_OVER_TWO-_,O=1;O<z+1;++O){if(E=W(p,i,f,h,y,m,c,u,x,E),S=W(Math.PI-p,i,f,h,y,m,c,u,x,S),t){for(T[g++]=E.x,T[g++]=E.y,T[g++]=E.z,d=2*O+2,P=1;P<d-1;++P)M=P/(d-1),I=n.lerp(E,S,M,N),T[g++]=I.x,T[g++]=I.y,T[g++]=I.z;T[g++]=S.x,T[g++]=S.y,T[g++]=S.z}r&&(v[R--]=E.z,v[R--]=E.y,v[R--]=E.x,v[j++]=S.x,v[j++]=S.y,v[j++]=S.z),p=w.PI_OVER_TWO-(O+1)*_}for(O=z;O>1;--O){if(p=w.PI_OVER_TWO-(O-1)*_,E=W(-p,i,f,h,y,m,c,u,x,E),S=W(p+Math.PI,i,f,h,y,m,c,u,x,S),t){for(T[g++]=E.x,T[g++]=E.y,T[g++]=E.z,d=2*(O-1)+2,P=1;P<d-1;++P)M=P/(d-1),I=n.lerp(E,S,M,N),T[g++]=I.x,T[g++]=I.y,T[g++]=I.z;T[g++]=S.x,T[g++]=S.y,T[g++]=S.z}r&&(v[R--]=E.z,v[R--]=E.y,v[R--]=E.x,v[j++]=S.x,v[j++]=S.y,v[j++]=S.z)}p=w.PI_OVER_TWO,E=W(-p,i,f,h,y,m,c,u,x,E);let A={};return t&&(T[g++]=E.x,T[g++]=E.y,T[g++]=E.z,A.positions=T,A.numPts=z),r&&(v[R--]=E.z,v[R--]=E.y,v[R--]=E.x,A.outerPositions=v),A};var tt=j;export{tt as a};