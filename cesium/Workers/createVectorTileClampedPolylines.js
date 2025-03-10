/*! For license information please see createVectorTileClampedPolylines.js.LICENSE.txt */
import{a as J}from"./chunk-PWAJ3RAI.js";import{a as Y}from"./chunk-CXNPIJLB.js";import{a as B}from"./chunk-NNHN6WUY.js";import{c as X,h as W}from"./chunk-YWRPWWKI.js";import"./chunk-VTVHUB7E.js";import{a as t,b as k,d as _}from"./chunk-JMSSU44E.js";import{a as v}from"./chunk-4UYSGV57.js";import"./chunk-ANLJ4KBN.js";import"./chunk-ID6SFQTL.js";import"./chunk-VLPNAR64.js";import"./chunk-GE5NEIZC.js";import"./chunk-35CVRQTC.js";var V=32767,it=Math.cos(v.toRadians(150)),ct=new k,rt=new t;function at(e,r,s,a,n,i,o){let l=e.length,d=new Float64Array(3*l);for(let f=0;f<l;++f){let l=e[f],h=r[f],c=s[f],u=v.lerp(a.west,a.east,l/V),p=v.lerp(a.south,a.north,h/V),m=v.lerp(n,i,c/V),A=k.fromRadians(u,p,m,ct),w=o.cartographicToCartesian(A,rt);t.pack(w,d,3*f)}return d}function dt(t){let e=t.length,r=new Uint32Array(e+1),s=0;for(let a=0;a<e;++a)r[a]=s,s+=t[a];return r[e]=s,r}var lt=new k,ht=new k;function ft(t,e,r,s){let a=s.length,n=t.length,i=new Uint8Array(n),o=lt,l=ht,d=0;for(let r=0;r<a;r++){let a=s[r],n=a;for(let r=1;r<a;r++){let s=d+r,a=s-1;l.longitude=t[s],l.latitude=e[s],o.longitude=t[a],o.latitude=e[a],k.equals(l,o)&&(n--,i[a]=1)}s[r]=n,d+=a}let f=0;for(let s=0;s<n;s++)1!==i[s]&&(t[f]=t[s],e[f]=e[s],r[f]=r[s],f++)}function ot(t){let e=8*t,r=3*e,s=4*e;this.startEllipsoidNormals=new Float32Array(r),this.endEllipsoidNormals=new Float32Array(r),this.startPositionAndHeights=new Float32Array(s),this.startFaceNormalAndVertexCornerIds=new Float32Array(s),this.endPositionAndHeights=new Float32Array(s),this.endFaceNormalAndHalfWidths=new Float32Array(s),this.vertexBatchIds=new Uint16Array(e),this.indices=B.createTypedArray(e,36*t),this.vec3Offset=0,this.vec4Offset=0,this.batchIdOffset=0,this.indexOffset=0,this.volumeStartIndex=0}var Q=new t,pt=new t;function $(e,r,s,a,n){let i=t.subtract(s,r,pt),o=t.subtract(r,e,Q);return t.normalize(i,i),t.normalize(o,o),t.dot(i,o)<it&&(o=t.multiplyByScalar(o,-1,Q)),t.add(i,o,n),t.equals(n,t.ZERO)&&(n=t.subtract(e,r)),t.cross(n,a,n),t.cross(a,n,n),t.normalize(n,n),n}var st=[0,2,6,0,6,4,0,1,3,0,3,2,0,4,5,0,5,1,5,3,1,5,7,3,7,5,4,7,4,6,7,6,2,7,2,3],j=st.length,tt=new t,ut=new t,mt=new t,At=new t,Nt=new t;ot.prototype.addVolume=function(e,r,s,a,n,i,o,l,d,f){let h=t.add(r,d,tt),c=f.geodeticSurfaceNormal(h,ut);h=t.add(s,d,tt);let u,p=f.geodeticSurfaceNormal(h,At),m=$(e,r,s,c,mt),A=$(a,s,r,p,Nt),k=this.startEllipsoidNormals,w=this.endEllipsoidNormals,N=this.startPositionAndHeights,b=this.startFaceNormalAndVertexCornerIds,g=this.endPositionAndHeights,v=this.endFaceNormalAndHalfWidths,I=this.vertexBatchIds,y=this.batchIdOffset,E=this.vec3Offset,x=this.vec4Offset;for(u=0;u<8;u++)t.pack(c,k,E),t.pack(p,w,E),t.pack(r,N,x),N[x+3]=n,t.pack(s,g,x),g[x+3]=i,t.pack(m,b,x),b[x+3]=u,t.pack(A,v,x),v[x+3]=o,I[y++]=l,E+=3,x+=4;this.batchIdOffset=y,this.vec3Offset=E,this.vec4Offset=x;let F=this.indices,P=this.volumeStartIndex,V=this.indexOffset;for(u=0;u<j;u++)F[V+u]=st[u]+P;this.volumeStartIndex+=8,this.indexOffset+=j};var gt=new W,Et=new _,wt=new t,M=new t,It=new t,xt=new t,T=new t;function Pt(e,r){let s=new Uint16Array(e.positions),a=new Uint16Array(e.widths),n=new Uint32Array(e.counts),i=new Uint16Array(e.batchIds),o=gt,l=Et,d=wt,f=new Float64Array(e.packedBuffer),h=0,c=f[h++],u=f[h++];W.unpack(f,h,o),h+=W.packedLength,_.unpack(f,h,l),h+=_.packedLength,t.unpack(f,h,d);let p,m=s.length/3,A=s.subarray(0,m),k=s.subarray(m,2*m),w=s.subarray(2*m,3*m);Y.zigZagDeltaDecode(A,k,w),ft(A,k,w,n);let N=n.length,b=0;for(p=0;p<N;p++)b+=n[p]-1;let g=new ot(b),I=at(A,k,w,o,c,u,l,d);m=A.length;let y=new Float32Array(3*m);for(p=0;p<m;++p)y[3*p]=I[3*p]-d.x,y[3*p+1]=I[3*p+1]-d.y,y[3*p+2]=I[3*p+2]-d.z;let E=0,x=0;for(p=0;p<N;p++){let e=n[p]-1,r=.5*a[p],s=i[p],o=E;for(let a=0;a<e;a++){let n=t.unpack(y,E,It),i=t.unpack(y,E+3,xt),f=w[x],h=w[x+1];f=v.lerp(c,u,f/V),h=v.lerp(c,u,h/V),x++;let p=M,m=T;if(0===a){let r=o+3*e,s=t.unpack(y,r,M);if(t.equals(s,n))t.unpack(y,r-3,p);else{let e=t.subtract(n,i,M);p=t.add(e,n,M)}}else t.unpack(y,E-3,p);if(a===e-1){let e=t.unpack(y,o,T);if(t.equals(e,i))t.unpack(y,o+3,m);else{let e=t.subtract(i,n,T);m=t.add(e,i,T)}}else t.unpack(y,E+6,m);g.addVolume(p,n,i,m,f,h,r,s,d,l),E+=3}E+=3,x++}let F=g.indices;r.push(g.startEllipsoidNormals.buffer),r.push(g.endEllipsoidNormals.buffer),r.push(g.startPositionAndHeights.buffer),r.push(g.startFaceNormalAndVertexCornerIds.buffer),r.push(g.endPositionAndHeights.buffer),r.push(g.endFaceNormalAndHalfWidths.buffer),r.push(g.vertexBatchIds.buffer),r.push(F.buffer);let P={indexDatatype:2===F.BYTES_PER_ELEMENT?B.UNSIGNED_SHORT:B.UNSIGNED_INT,startEllipsoidNormals:g.startEllipsoidNormals.buffer,endEllipsoidNormals:g.endEllipsoidNormals.buffer,startPositionAndHeights:g.startPositionAndHeights.buffer,startFaceNormalAndVertexCornerIds:g.startFaceNormalAndVertexCornerIds.buffer,endPositionAndHeights:g.endPositionAndHeights.buffer,endFaceNormalAndHalfWidths:g.endFaceNormalAndHalfWidths.buffer,vertexBatchIds:g.vertexBatchIds.buffer,indices:F.buffer};if(e.keepDecodedPositions){let t=dt(n);r.push(I.buffer,t.buffer),P=X(P,{decodedPositions:I.buffer,decodedPositionOffsets:t.buffer})}return P}var Vt=J(Pt);export{Vt as default};