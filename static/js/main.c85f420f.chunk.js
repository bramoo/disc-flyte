(this["webpackJsonpdisc-flyte"]=this["webpackJsonpdisc-flyte"]||[]).push([[0],{42:function(e,n,a){},43:function(e,n,a){},56:function(e,n,a){},58:function(e,n,a){},60:function(e,n,a){},61:function(e,n,a){},64:function(e,n,a){"use strict";a.r(n);var t=a(9),r=a.n(t),i=a(34),l=a.n(i),c=(a(42),a(14)),s=a(0),o=a(1),u=a(2),h=a(3),d=(a(43),a(13)),j=a(31),p=a.n(j),v=(a(56),a(10));function g(e){var n=p()();return Object(v.jsxs)("div",{children:[Object(v.jsx)("label",{htmlFor:this.id,children:e.label}),Object(v.jsx)("input",{id:n,name:e.name,type:"number",value:e.value,onChange:function(n){return e.onChange(n)}})]})}a(58);function x(e){var n=p()();return Object(v.jsxs)("div",{children:[Object(v.jsx)("label",{htmlFor:n,children:e.label}),Object(v.jsx)("select",{id:n,name:e.name,value:e.value,onChange:function(n){return e.onChange(n)},children:e.children})]})}var y=a(4);function b(e,n,a){if(Array.isArray(e))return e.map((function(e){return b(e,n,a)}));if(e<n[0])return a[0];for(var t=0,r=1;t<n.length-1;t++,r++)if(n[t+1]>e)return(a[t]*(n[r]-e)+a[r]*(e-n[t]))/(n[r]-n[t]);return a[a.length-1]}function m(e,n,a){return new y.Vector3(e,n,a)}var w=function(){function e(n){Object(s.a)(this,e),this.name=n,this.aoarange=[0],this.cl=[0],this.cd=[0],this.cm=[0],this.jxy=0,this.jz=0,this.diam=0}return Object(o.a)(e,[{key:"getCl",value:function(e){return b(e,this.aoarange,this.cl)}},{key:"getCd",value:function(e){return b(e,this.aoarange,this.cd)}},{key:"getCm",value:function(e){return b(e,this.aoarange,this.cm)}}]),e}(),f=new w("Aviar");f.aoarange=[-1.570796327,-.5235987756,-.0872664626,-.06981317008,-.05235987756,-.03490658504,-.01745329252,0,.01745329252,.03490658504,.05235987756,.06981317008,.0872664626,.1047197551,.1221730476,.1396263402,.1570796327,.1745329252,.1919862177,.2094395102,.2268928028,.2443460953,.2617993878,.7853981634,.872664626,1.570796327],f.cl=[0,-1,-.088,-.049,-.009,.034,.093,.154,.21,.256,.304,.343,.383,.426,.468,.508,.549,.591,.631,.672,.702,.74,.78,1.6,.8,0],f.cd=[.4,.188,.076,.071,.07,.072,.072,.084,.088,.085,.102,.117,.133,.141,.157,.174,.189,.203,.216,.226,.245,.266,.281,.7,.5,.6],f.cm=[0,-.08,-.015,-.016,-.011,-.01,-.013,-.018,-.018,-.017,-.014,-.014,-.011,-.008,-.005,0,.005,.009,.011,.02,.024,.032,.039,.23,.02,0],f.jxy=.00423,f.jz=.00846,f.diam=.21;var M=new w("Wraith");M.aoarange=[-1.570796327,-.5235987756,-.0872664626,-.06981317008,-.05235987756,-.03490658504,-.01745329252,0,.01745329252,.03490658504,.05235987756,.06981317008,.0872664626,.1047197551,.1221730476,.1396263402,.1570796327,.1745329252,.1919862177,.2094395102,.2268928028,.2443460953,.2617993878,.7853981634,.872664626,1.570796327],M.cl=[0,-1,-.088,-.049,-.009,.034,.093,.154,.21,.256,.304,.343,.383,.426,.468,.508,.549,.591,.631,.672,.702,.74,.78,1.6,.8,0],M.cd=[.4,.188,.076,.071,.07,.072,.072,.084,.088,.085,.102,.117,.133,.141,.157,.174,.189,.203,.216,.226,.245,.266,.281,.7,.5,.6],M.cm=[0,-.08,-.015,-.016,-.011,-.01,-.013,-.018,-.018,-.017,-.014,-.014,-.011,-.008,-.005,0,.005,.009,.011,.02,.024,.032,.039,.23,.02,0],M.jxy=.00423,M.jz=.00846,M.diam=.21;var O=[f,M];a(60);function A(e){var n=Object(t.useState)(!1),a=Object(d.a)(n,2),r=a[0],i=a[1],l=function(n){var a=n.target.name,t=e.throw;t[a]=n.target.value,e.onThrowChange(t)},c=e.throw;return Object(v.jsxs)("div",{className:"container",children:[Object(v.jsx)("header",{onClick:function(){return i(!r)},children:Object(v.jsx)("span",{className:"heading",children:O[c.disc].name})}),r&&Object(v.jsxs)("div",{className:"inputs",children:[Object(v.jsx)(x,{label:"Disc",name:"disc",value:c.disc,onChange:l,children:O.map((function(e,n){return Object(v.jsx)("option",{value:n,children:e.name})}))}),Object(v.jsx)(g,{label:"Mass (g)",name:"mass",value:c.mass,onChange:l}),Object(v.jsx)(g,{label:"Speed (mph)",name:"speed",value:c.speed,onChange:l}),Object(v.jsx)(g,{label:"Spin (rev/s)",name:"spin",value:c.spin,onChange:l}),Object(v.jsxs)(x,{label:"Dir.",name:"direction",value:c.direction,onChange:l,children:[Object(v.jsx)("option",{value:"1",children:"Clockwise (RHBH/LHFH)"}),Object(v.jsx)("option",{value:"-1",children:"Anti-Clockwise (LHBH/RHFH)"})]}),Object(v.jsx)(g,{label:"Launch Angle (deg)",name:"launchAngle",value:c.launchAngle,onChange:l}),Object(v.jsx)(g,{label:"Nose Angle (deg)",name:"noseAngle",value:c.noseAngle,onChange:l}),Object(v.jsx)(g,{label:"Roll Angle (deg)",name:"rollAngle",value:c.rollAngle,onChange:l})]})]})}var C=a(17),S=a(67),k=a(66);a(61);function z(e){var n=[0,0,0];e.result&&(n=e.result.pos_g.filter((function(e){return!!e})).map((function(e){return m(e.x,e.y,e.z)})).reduce((function(e,n){return e.concat([n.y,n.z,n.x])}),[]));return Object(v.jsxs)(C.a,{camera:{position:[0,0,-5]},children:[Object(v.jsx)("axesHelper",{}),Object(v.jsx)(S.a,{}),Object(v.jsx)("ambientLight",{color:4210752}),Object(v.jsx)("pointLight",{position:[0,20,25],decay:2}),Object(v.jsx)(k.a,{color:"red",points:n}),Object(v.jsxs)("mesh",{position:[0,0,35],rotation:[-Math.PI/2,0,0],children:[Object(v.jsx)("planeGeometry",{args:[10,70]}),Object(v.jsx)("meshStandardMaterial",{color:"#00aa00"})]})]})}var D=function(){function e(){Object(s.a)(this,e)}return Object(o.a)(e,null,[{key:"groundDisc",value:function(e){var n=e.x,a=e.y,t=e.z,r=Math.cos(n),i=Math.cos(a),l=Math.cos(t),c=Math.sin(n),s=Math.sin(a),o=Math.sin(t);return(new y.Matrix3).set(i*l,c*s*l-r*o,r*s*l+c*c,i*o,c*s*o+r*l,r*s*o-c*l,-s,c*i,r*i)}},{key:"discGround",value:function(e){var n=e.x,a=e.y,t=e.z,r=Math.cos(n),i=Math.cos(a),l=Math.cos(t),c=Math.sin(n),s=Math.sin(a),o=Math.sin(t);return(new y.Matrix3).set(i*l,i*o,-s,c*s*l-r*o,c*s*o+r*l,c*i,r*s*l+c*o,r*s*o-c*l,r*i)}},{key:"discSlip",value:function(e){var n=Math.cos(e),a=Math.sin(e);return(new y.Matrix3).set(n,-a,0,a,n,0,0,0,1)}},{key:"slipDisc",value:function(e){var n=Math.cos(e),a=Math.sin(e);return(new y.Matrix3).set(n,a,0,-a,n,0,0,0,1)}},{key:"slipWind",value:function(e){var n=Math.cos(e),a=Math.sin(e);return(new y.Matrix3).set(n,0,-a,0,1,0,a,0,n)}},{key:"windSlip",value:function(e){var n=Math.cos(e),a=Math.sin(e);return(new y.Matrix3).set(n,0,a,0,1,0,-a,0,n)}}]),e}(),_=.01,H=1001;function N(e,n,a,t,r,i,l,c){var s=0,o=new Array(H),u=new Array(H),h=new Array(H),d=new Array(H),j=new Array(H),p=new Array(H),v=new Array(H),g=new Array(H),x=new Array(H),y=new Array(H),b=new Array(H),w=new Array(H),f=new Array(H),M=new Array(H),O=new Array(H),A=new Array(H),C=new Array(H),S=new Array(H),k=new Array(H);j[s]=m(n,a,0),h[s]=m(i*Math.cos(t),0,i*Math.sin(t));var z=m(0,t,0).applyMatrix3(D.groundDisc(j[s]));j[s].add(z),u[s]=m(0,0,r);for(var N=e.diam,F=e.jxy*c,I=e.jz*c,P=Math.PI*Math.pow(.5*N,2),L=9.81*c;u[s].z>0&&!(s>=1e3);){for(var T=0;;){g[s]=h[s].clone().applyMatrix3(D.groundDisc(j[s])),f[s]=-Math.atan2(g[s].y,g[s].x),b[s]=g[s].clone().applyMatrix3(D.discSlip(f[s])),A[s]=-Math.atan2(b[s].z,b[s].x),O[s]=b[s].clone().applyMatrix3(D.slipWind(A[s]));var B=m(0,0,-L).applyMatrix3(D.groundDisc(j[s])).clone().applyMatrix3(D.discSlip(f[s])).clone().applyMatrix3(D.slipWind(A[s]));if(C[s]=.59*Math.pow(O[s].x,2)*P*e.getCd(A[s]),S[s]=.59*Math.pow(O[s].x,2)*P*e.getCl(A[s]),k[s]=.59*Math.pow(O[s].x,2)*P*N*e.getCm(A[s]),M[s]=m(),w[s]=m(),M[s].x=(B.x-C[s])/c,M[s].z=(B.z+S[s])/c,M[s].y=B.y/c,w[s].x=-k[s]/(l*(F-I)),y[s]=M[s].clone().applyMatrix3(D.windSlip(A[s])),v[s]=y[s].clone().applyMatrix3(D.slipDisc(f[s])),d[s]=v[s].clone().applyMatrix3(D.discGround(j[s])),x[s]=w[s].clone().applyMatrix3(D.slipDisc(f[s])),p[s]=x[s].clone().applyMatrix3(D.discGround(j[s])),0===s)break;if(T>=1)break;var G=d[s-1].clone().add(d[s]).multiplyScalar(.5),W=p[s-1].clone().add(p[s]).multiplyScalar(.5);h[s]=h[s-1].clone().add(G.clone().multiplyScalar(_)),u[s]=u[s-1].clone().add(h[s-1].clone().multiplyScalar(_)).add(G.clone().multiplyScalar(.5*Math.pow(_,2))),j[s]=j[s-1].clone().add(W.clone().multiplyScalar(_)),T++}h[s+1]=h[s].clone().add(d[s].clone().multiplyScalar(_)),u[s+1]=u[s].clone().add(h[s].clone().multiplyScalar(_)).add(d[s].clone().multiplyScalar(.5*Math.pow(_,2))),j[s+1]=j[s].clone().add(p[s].clone().multiplyScalar(_)),o[s+1]=o[s]+_,s++}return{t:o,lift:S,drag:C,mom:k,alpha:A,beta:f,pos_g:u,vel_g:h,acl_g:d,ori_g:j,rot_g:p,vel_d:g,vel_w:O,acl_w:M,rot_s:w}}var F=function(e){Object(u.a)(a,e);var n=Object(h.a)(a);function a(e){var t;Object(s.a)(this,a);var r=[{disc:0,mass:175,speed:50,spin:27,direction:1,launchAngle:10,noseAngle:4,rollAngle:8},{disc:1,mass:170,speed:30,spin:20,direction:1,launchAngle:8,noseAngle:6,rollAngle:0}],i=(t=n.call(this,e)).simulate(r[0]);return t.state={throws:r,result:i},t}return Object(o.a)(a,[{key:"simulate",value:function(e){var n=[e.rollAngle*Math.PI/180,e.noseAngle*Math.PI/180,e.launchAngle*Math.PI/180,1.8,.44704*e.speed,e.spin*e.direction*2*Math.PI,e.mass/1e3];return N.apply(void 0,[O[e.disc]].concat(n))}},{key:"handleThrowChange",value:function(e,n){var a=this.simulate(n);this.setState({result:a});var t=Object(c.a)(this.state.throws);t[e]=n,this.setState({throws:t})}},{key:"render",value:function(){var e=this;return Object(v.jsxs)("div",{className:"app-container",children:[Object(v.jsxs)("div",{className:"throw-container",children:[Object(v.jsx)("h2",{className:"throw-header",children:"Throws"}),Object(v.jsx)("div",{className:"throw-list",children:this.state.throws.map((function(n,a){return Object(v.jsx)(A,{throw:n,onThrowChange:e.handleThrowChange.bind(e,a)},a)}))})]}),Object(v.jsx)("div",{className:"view-container",children:Object(v.jsx)(z,{result:this.state.result})})]})}}]),a}(r.a.Component),I=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,68)).then((function(n){var a=n.getCLS,t=n.getFID,r=n.getFCP,i=n.getLCP,l=n.getTTFB;a(e),t(e),r(e),i(e),l(e)}))};l.a.render(Object(v.jsx)(r.a.StrictMode,{children:Object(v.jsx)(F,{})}),document.getElementById("root")),I()}},[[64,1,2]]]);
//# sourceMappingURL=main.c85f420f.chunk.js.map