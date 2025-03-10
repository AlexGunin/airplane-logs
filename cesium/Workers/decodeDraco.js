/*! For license information please see decodeDraco.js.LICENSE.txt */
import{a as D}from"./chunk-JCUVYVZU.js";import{a as I}from"./chunk-PWAJ3RAI.js";import{a as m}from"./chunk-NNHN6WUY.js";import{a as w}from"./chunk-VTVHUB7E.js";import"./chunk-4UYSGV57.js";import"./chunk-ANLJ4KBN.js";import{a as A}from"./chunk-ID6SFQTL.js";import"./chunk-VLPNAR64.js";import"./chunk-GE5NEIZC.js";import{d as P,e as d}from"./chunk-35CVRQTC.js";var r,b=P(D(),1);function F(t,e){let n=t.num_points(),o=t.num_faces(),a=new r.DracoInt32Array,i=3*o,s=m.createTypedArray(n,i),u=0;for(let r=0;r<o;++r)e.GetFaceFromMesh(t,r,a),s[u+0]=a.GetValue(0),s[u+1]=a.GetValue(1),s[u+2]=a.GetValue(2),u+=3;return r.destroy(a),{typedArray:s,numberOfIndices:i}}function U(t,e,n,o,a){let i,s;o.quantizationBits<=8?(s=new r.DracoUInt8Array,i=new Uint8Array(a),e.GetAttributeUInt8ForAllPoints(t,n,s)):o.quantizationBits<=16?(s=new r.DracoUInt16Array,i=new Uint16Array(a),e.GetAttributeUInt16ForAllPoints(t,n,s)):(s=new r.DracoFloat32Array,i=new Float32Array(a),e.GetAttributeFloatForAllPoints(t,n,s));for(let t=0;t<a;++t)i[t]=s.GetValue(t);return r.destroy(s),i}function k(t,e,n,o){let a,i;switch(n.data_type()){case 1:case 11:i=new r.DracoInt8Array,a=new Int8Array(o),e.GetAttributeInt8ForAllPoints(t,n,i);break;case 2:i=new r.DracoUInt8Array,a=new Uint8Array(o),e.GetAttributeUInt8ForAllPoints(t,n,i);break;case 3:i=new r.DracoInt16Array,a=new Int16Array(o),e.GetAttributeInt16ForAllPoints(t,n,i);break;case 4:i=new r.DracoUInt16Array,a=new Uint16Array(o),e.GetAttributeUInt16ForAllPoints(t,n,i);break;case 5:case 7:i=new r.DracoInt32Array,a=new Int32Array(o),e.GetAttributeInt32ForAllPoints(t,n,i);break;case 6:case 8:i=new r.DracoUInt32Array,a=new Uint32Array(o),e.GetAttributeUInt32ForAllPoints(t,n,i);break;case 9:case 10:i=new r.DracoFloat32Array,a=new Float32Array(o),e.GetAttributeFloatForAllPoints(t,n,i)}for(let t=0;t<o;++t)a[t]=i.GetValue(t);return r.destroy(i),a}function p(t,e,n){let o,a=t.num_points(),i=n.num_components(),s=new r.AttributeQuantizationTransform;if(s.InitFromAttribute(n)){let t=new Array(i);for(let r=0;r<i;++r)t[r]=s.min_value(r);o={quantizationBits:s.quantization_bits(),minValues:t,range:s.range(),octEncoded:!1}}r.destroy(s),s=new r.AttributeOctahedronTransform,s.InitFromAttribute(n)&&(o={quantizationBits:s.quantization_bits(),octEncoded:!0}),r.destroy(s);let u,l=a*i;u=d(o)?U(t,e,n,o,l):k(t,e,n,l);let A=w.fromTypedArray(u);return{array:u,data:{componentsPerAttribute:i,componentDatatype:A,byteOffset:n.byte_offset(),byteStride:w.getSizeInBytes(A)*i,normalized:n.normalized(),quantization:o}}}function O(t){let e=new r.Decoder;t.dequantizeInShader&&(e.SkipAttributeTransform(r.POSITION),e.SkipAttributeTransform(r.NORMAL));let n=new r.DecoderBuffer;if(n.Init(t.buffer,t.buffer.length),e.GetEncodedGeometryType(n)!==r.POINT_CLOUD)throw new A("Draco geometry type must be POINT_CLOUD.");let o=new r.PointCloud,a=e.DecodeBufferToPointCloud(n,o);if(!a.ok()||0===o.ptr)throw new A(`Error decoding draco point cloud: ${a.error_msg()}`);r.destroy(n);let i={},s=t.properties;for(let t in s)if(s.hasOwnProperty(t)){let n;if("POSITION"===t||"NORMAL"===t){let a=e.GetAttributeId(o,r[t]);n=e.GetAttribute(o,a)}else{let r=s[t];n=e.GetAttributeByUniqueId(o,r)}i[t]=p(o,e,n)}return r.destroy(o),r.destroy(e),i}function g(t){let e=new r.Decoder;if(t.dequantizeInShader)for(let n=0;n<t.attributesToSkipTransform.length;++n)e.SkipAttributeTransform(r[t.attributesToSkipTransform[n]]);let n=t.bufferView,o=new r.DecoderBuffer;if(o.Init(t.array,n.byteLength),e.GetEncodedGeometryType(o)!==r.TRIANGULAR_MESH)throw new A("Unsupported draco mesh geometry type.");let a=new r.Mesh,i=e.DecodeBufferToMesh(o,a);if(!i.ok()||0===a.ptr)throw new A(`Error decoding draco mesh geometry: ${i.error_msg()}`);r.destroy(o);let s={},u=t.compressedAttributes;for(let t in u)if(u.hasOwnProperty(t)){let r=u[t],n=e.GetAttributeByUniqueId(a,r);s[t]=p(a,e,n)}let l={indexArray:F(a,e),attributeData:s};return r.destroy(a),r.destroy(e),l}async function z(t,r){return d(t.bufferView)?g(t):O(t)}async function G(t,e){let n=t.webAssemblyConfig;return r=d(n)&&d(n.wasmBinaryFile)?await(0,b.default)(n):await(0,b.default)(),!0}async function S(t,r){let e=t.webAssemblyConfig;return d(e)?G(t,r):z(t,r)}var h=I(S);export{h as default};