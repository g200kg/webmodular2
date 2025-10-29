"use strict";


console.log(WebAudioControlsOptions)

const svgWavTri = '<svg width="16" height="10" stroke-width="1.5" stroke="#ccf" fill="none"><path d="M 1 5 L 5 1 L 11 9 L 15 5"/></svg>';
const svgWavSaw = '<svg width="16" height="10" stroke-width="1.5" stroke="#ccf" fill="none"><path d="M 1 5 L 1 1 L 15 9 L 15 5"/></svg>';
const svgWavSawR = '<svg width="16" height="10" stroke-width="1.5" stroke="#ccf" fill="none"><path d="M 1 5 L 1 9 L 15 1 L 15 5"/></svg>';
const svgWavSqr = '<svg width="16" height="10" stroke-width="1.5" stroke="#ccf" fill="none"><path d="M 1 5 L 1 1 L 8 1 L 8 9 L 15 9 L 15 5"/></svg>';
const svgWavSin = '<svg width="16" height="10" stroke-width="1.5" stroke="#ccf" fill="none"><path d="M 0 5 L 2.5 1.5 L 3.75 1 L 5 1.5 L 7.5 5 L 10 8.5 L 11.25 9 L 12.5 8.5 L 15 5"/></svg>';

const demoPatch = 
    {
      demo1:`[{"id":"kbd","type":"KBD","Mml":"t150l8o3g4efg4efg<gab>cdefe4cde4<efgagfgefgf4agf4ededcdefgaf4aga4b>c<gab>cdefgc1","Lp":1},{"id":"1","type":"VCO","Oct":1,"Frm":2,"m1":"kbd.cv"},{"id":"2","type":"VCO","PM":36,"PMn":3,"Oct":-1,"Frm":2,"Fin":-7},{"id":"3","type":"VCF","i1":"1.o","I1":83,"Frq":24,"Res":12,"m1":"kbd.cv"},{"id":"4","type":"VCF"},{"id":"5","type":"VCA","i1":"3.o","m1":"7.o1"},{"id":"6","type":"VCA"},{"id":"7","type":"EG","A1":6,"D1":30,"S1":0,"R1":26,"t1":"kbd.gt","A2":6,"D2":39,"S2":0,"t2":"kbd.gt"},{"id":"8","type":"LFO","Frq1":0.6,"Frm1":2},{"id":"9","type":"MISC"},{"id":"out","type":"OUT","M":36,"i1":"5.o"}]`,
      demo2:`[{"id":"kbd","type":"KBD","Gl":17,"Mml":"t150ed<g4>grg4ed<g4>grg4ed<g4>g4<e4>g4<d4>f+rf+4ed<d4>f+rf+4ed<d4>f+rf+4ed<d4>f+4<e4>f+4<g4>grg4","Lp":1},{"id":"1","type":"VCO","Frm":2,"M3":22,"m1":"kbd.cv","m3":"2.o"},{"id":"2","type":"VCO","Oct":-1,"m1":"kbd.cv"},{"id":"3","type":"VCF","i1":"1.o","Frq":3,"Res":16,"M3":5,"m1":"kbd.cv","m3":"8.o1"},{"id":"4","type":"VCF"},{"id":"5","type":"VCA","i1":"3.o","m1":"7.o1"},{"id":"6","type":"VCA","i1":"9.wo","I1":0,"m1":"7.o2"},{"id":"7","type":"EG","A1":12,"D1":58,"S1":0,"R1":9,"t1":"kbd.gt","D2":60,"S2":0,"t2":"kbd.gt"},{"id":"8","type":"LFO","Frq1":4.5},{"id":"9","type":"MISC"},{"id":"out","type":"OUT","I1":84,"I2":86,"i1":"5.o","i2":"6.o"}]`,
      demo3:`[{"id":"kbd","type":"KBD","Gl":17},{"id":"1","type":"VCO","Frm":2,"m1":"9.so"},{"id":"2","type":"VCO","Oct":-1,"Frm":1,"Fin":-16,"m1":"9.so"},{"id":"3","type":"VCF","i1":"1.o","i2":"2.o","I1":48,"I2":54,"Frq":21,"Res":21,"M1":31,"m1":"9.so"},{"id":"4","type":"VCF"},{"id":"5","type":"VCA","i1":"3.o","m1":"7.o1"},{"id":"6","type":"VCA"},{"id":"7","type":"EG","D1":38,"S1":0,"R1":18,"t1":"8.o2"},{"id":"8","type":"LFO","Frq2":4.3,"Frm2":1},{"id":"9","type":"MISC","si":"9.wo","st":"8.o2"},{"id":"out","type":"OUT","i1":"5.o"}]`
    };

function Jack(x,y,type,dir) {
    switch(type) {
    case "input":
        if(dir=="u")
            return `<svg width="16" height="16" style="position:absolute;left:${x}px;top:${y}px"><path fill="#cc0" d="M 8 14 L 3 4 L 13 4 z"/></svg>` +
                `<div class="input" style="position:absolute;left:${x}px;top:${y+16}px"></div>`;
        else
            return `<div class="input" style="position:absolute;left:${x}px;top:${y}px"></div>` +
                `<svg width="16" height="16" style="position:absolute;left:${x}px;top:${y+16}px><path fill="#cc0" d="M 8 4 L 3 14 L 13 14 z"/></svg>`;
    case "output":
        if(dir=="u")
            return `<svg width="16" height="16" style="position:absolute;left:${x}px;top:${y}px><path fill="#cc0" d="M 8 4 L 3 14 L 13 14 z"/></svg>` +
                `<div class="input" style="position:absolute;left:${x}px;top:${y+16}px"></div>`;
        else
            return `<div class="input" style="position:absolute;left:${x}px;top:${y}px"></div>` +
                `<svg width="16" height="16" style="position:absolute;left:${x}px;top:${y+16}px"><path fill="#cc0" d="M 8 14 L 3 4 L 13 4 z"/></svg>`;
    }
}
class Param {
    constructor(mod, param) {
        this.mod = mod;
        this.type = param.type;
        this.name = param.name;
        this.x = param.x;
        this.y = param.y;
        this.w = param.w;
        this.h = param.h;
        this.target = param.target;
        this.id = this.mod.id + "." + param.class;
        this.class = param.class;
        this.elm = document.createElement("div");
        this.elm.style = "position:absolute;top:0;left:0";
        this.elm.param = this;
        this.drag = null;
        this.click = false;
        this.val = param.val;
        this.temp = param.temp;
        let inner, opt;
        switch(this.type) {
        case "mml":
            inner = `<textarea id="${this.id}" class="${this.class}" spellcheck="false" style="position:absolute;left:${this.x}px;top:${this.y}px;width:320px;height:75px;resize:none" spellcheck="none"></textarea>`;
            this.elm.innerHTML = inner;
            break;
        case "switch":
            opt = "";
            if(param.src)
                opt += `src="${param.src} "`;
            if(param.w)
                opt += `width=${param.w} `;
            if(param.h)
                opt += `height=${param.h} `;
            inner = `<webaudio-switch id="${this.id}" class="${this.class}" value="${this.val}" ${opt} style="position:absolute;top:${this.y}px;left:${this.x-WebAudioControlsOptions.switchWidth*.5}px"></webaudio-switch>`;
            if(param.l)
                inner += `<div class="text" style="position:absolute;top:${param.ly}px;left:${param.lx}px">${param.l}</div>`;
            this.elm.innerHTML = inner;
            break;
        case "slider":
            let inner2 = '';
            if(param.h)
                inner2 = `height="${param.h}"`;
            inner = `<webaudio-slider direction="vert" id="${this.id}" class="${this.class}" ${inner2} value="${param.val}" min="${param.min}" max="${param.max}" step="${param.step}" style="position:absolute;top:${this.y}px;left:${this.x}px"></webaudio-slider>`;
            if(param.l)
                inner += `<div class="text" style="position:absolute;top:${param.ly}px;left:${param.lx}px">${param.l}</div>`;
            this.elm.target = param.target;
            this.elm.innerHTML = inner;
            break;
        case "knob":
            inner = `<webaudio-knob id="${this.id}" class="${this.class}" diameter="${param.d}" value="${param.val}" min="${param.min}" max="${param.max}" step="${param.step}" log="${param.log}" style="position:absolute;top:${this.y}px;left:${this.x}px"></webaudio-knob>`;
            if(param.vx)
                inner += `<webaudio-param link="${this.id}" style="position:absolute;top:${param.vy}px;left:${param.vx}px"></webaudio-param>`;
            if(param.l)
                inner += `<div class="text" style="position:absolute;top:${param.ly}px;left:${param.lx}px">${param.l}</div>`;
            this.elm.target = param.target;
            this.elm.innerHTML = inner;
            break;
        case "input":
        case "output":
            inner = `<div style='position:relative'>`;
            inner += `<div id="${this.id}" class="${param.type}" style="position:absolute;top:${param.y}px;left:${param.x}px"></div>`;
            if(param.type == "input")
                if(param.md == "u")
                    inner += `<svg width="16" height="16" style="position:absolute;top:${param.y-24}px;left:${param.x-8}px"><path fill="#cc0" d="M 8 14 L 3 4 L 13 4 z"/></svg>`;
                else
                    inner += `<svg width="16" height="16" style="position:absolute;top:${param.y+8}px;left:${param.x-8}px"><path fill="#cc0" d="M 8 4 L 3 14 L 13 14 z"/></svg>`;
            if(param.type == "output") {
                if(param.md == "u")
                    inner += `<svg width="16" height="16" style="position:absolute;top:${param.y-24}px;left:${param.x-8}px"><path fill="#cc0" d="M 8 4 L 3 14 L 13 14 z"/></svg>`;
                else
                    inner += `<svg width="16" height="16" style="position:absolute;top:${param.y+8}px;left:${param.x-8}px"><path fill="#cc0" d="M 8 14 L 3 4 L 13 4 z"/></svg>`;
            }
            if(param.l)
                inner += `<div class="text" style="position:absolute;top:${param.ly}px;left:${param.lx}px">${param.l}</div>`;
            inner += "</div>";
            this.elm.innerHTML = inner;
            this.elm.addEventListener("pointerdown",(e)=>{
                const pt = this.getPt(e);
                if(e.target.className == "input" || e.target.className == "output") {
                    this.elm.setPointerCapture(e.pointerId);
                    this.drag = e.target.id;
                    this.click = true;
                }
            });
            this.elm.addEventListener("pointerup", (e)=>{
                if(this.drag) {
                    const param2 = rack.findJack(e.clientX, e.clientY);
                    if(param2) {
                        if(this.type == "output" && param2.type == "input") {
                            rack.connect(this, param2);
                        }
                        else if(this.type == "input" && param2.type == "output") {
                            rack.connect(param2, this);
                        }
                    }
                    this.drag = null;
                    rack.draw();
                }
            });
            this.elm.addEventListener("pointermove", (e)=>{
                this.click = false;
                if(this.drag) {
                    const ptCur = this.getPt(e);
                    const ptFrom = this.getPt(this);
                    rack.draw();
                    cable.drawCable(ptFrom.x, ptFrom.y, ptCur.x, ptCur.y);
                    const param2 = rack.findJack(e.pageX, e.pageY);
                    if(param2) {
                        if((this.type == "output" && param2.type == "input") || (this.type == "input" && param2.type == "output"))
                            cable.drawMark(ptCur.x, ptCur.y, 1);
                        else if(param2.type == "input" || param2.type == "output")
                            cable.drawMark(ptCur.x, ptCur.y, 0);
                    }
                }
            });
            this.elm.addEventListener("click", (e)=>{
                if(this.click) {
                    const ptCur = this.getPt(e);
                    const mstyle = document.getElementById("menu").style;
                    document.getElementById("menupane").style.display = "block";
                    rack.focus = this;
                    mstyle.top = ptCur.y+"px";
                    mstyle.left = ptCur.x+"px";
                    this.click = false;
                }
            });
            break;
        }
    }
    getPt(e) {
        const rpos = document.getElementById("cablepane").getBoundingClientRect();
        const mpos = this.mod.div.getBoundingClientRect();
        if(e.offsetX!=undefined)
            return {x:e.offsetX + mpos.left - rpos.left, y:e.offsetY + mpos.top - rpos.top};
        return {x:e.x + mpos.left - rpos.left, y:e.y + mpos.top - rpos.top};
    }
    getParam() {
        let v;
        switch(this.type) {
        case 'mml':
            return `"Mml":"${document.getElementById(this.id).value}"`;
        case 'slider':
        case 'knob':
        case 'switch':
            if(this.temp)
                return "";
            v = document.getElementById(this.id).value;
            if(v != this.val)
                return `"${this.class}":${document.getElementById(this.id).value}`;
            return "";
        case 'input':
            if(rack.connection[this.id]) {
                v = rack.connection[this.id][0].id;
                if(v)
                    return `"${this.class}":"${v}"`;
                return "";
            }
            return "";
        default:
            return "";
        }
    }
    setValue(v) {
        const elm = document.getElementById(this.id);
        if(elm.className == "output")
            return;
        if(elm.className == "input") {
            if(!v) {
                rack.disconnect(this.id);
                return;
            }
            rack.connect(this, v);
            return;
        }
        if(elm.className == "Mml") {
            elm.value = v;
            return;
        }
        if(elm.setValue)
            document.getElementById(this.id).setValue(v, true);
    }
}
class Module {
    constructor(name, w, h, x, y) {
        this.div = document.createElement("div");
        this.div.className = "module";
        this.params = [];
        if(x!=undefined)
            this.div.style = `position:absolute;width:${w}px;height:${h}px;left:${x}px;top:${y}px`;
        else
            this.div.style = `position:relative;width:${w}px;height:${h}px`;
        if(name)
            this.id = name;
        else
            this.id = modSerial++;
        this.title = "Module";
    }
    addElm(arg) {
        let elm, s, h;
        switch(arg.type) {
        case "title":
        case "text":
            elm = document.createElement("div");
            elm.innerHTML = arg.label;
            elm.className = arg.type;
            elm.style = `left:${arg.x}px;top:${arg.y}px`;
            this.div.appendChild(elm);
            break;
        case "scope":
            elm = document.createElement("canvas");
            elm.id = arg.id;
            elm.width = 100;
            elm.height = 100;
            elm.className = "scope";
            elm.style = `left:${arg.x}px;top:${arg.y}px`;
            this.div.appendChild(elm);
            break;
        case "keyboard":
            elm = document.createElement("webaudio-keyboard");
            elm.id = arg.id;
            elm.className = arg.type;
            elm.keys = 37;
            elm.width = 470;
            elm.height = 90;
            elm.style = `left:${arg.x}px;top:${arg.y}px;width:470px;height:90px`;
            this.div.appendChild(elm);
            break;
        }
    }
    addParam(param) {
        const p = new Param(this, param);
        this.div.appendChild(p.elm);
        this.params.push(p);
    }
    getParams() {
        let s = "";
        for(const p of this.params) {
            const ss = p.getParam();
            if(ss)
                s += ','+ss;
        }
        return `{"id":"${this.id}","type":"${this.type}"${s}}`;
    }
}
class OUTMIX extends Module {
    constructor(rack, name) {
        super(name,130,560);
        this.rack = rack;
        this.type = "OUT";
        this.ar = new Uint8Array(100);
        this.nodeOut = new GainNode(this.rack.actx, {gain:0.5});
        this.nodeComp = new DynamicsCompressorNode(this.rack.actx);
        this.nodeAnalyser = new AnalyserNode(this.rack.actx);
        this.nodeOut.connect(this.rack.actx.destination);
        this.nodeComp.connect(this.nodeAnalyser).connect(this.nodeOut);
        this.nodeI1 = new GainNode(this.rack.actx, {gain:1});
        this.nodeI1.connect(this.nodeComp);
        this.nodeI2 = new GainNode(this.rack.actx, {gain:0});
        this.nodeI2.connect(this.nodeComp);
        this.nodeI3 = new GainNode(this.rack.actx, {gain:0});
        this.nodeI3.connect(this.nodeComp);
        this.addElm({type:"title", label:"OUTMIX", x:0, y:0});
        this.addElm({type:"text", label:"\u250f\u2501 Input \u2501\u2513", x:50, y:25});
        this.addElm({type:"scope", id:"outmix.scope", x:13, y:210});
        this.addParam({type:"slider", class:"I1", x:20, y:77, min:0, max:100, step:1, val:50, l:"1", lx:20, ly:167});
        this.addParam({type:"slider", class:"I2", x:50, y:77, min:0, max:100, step:1, val:0, l:"2", lx:50, ly:167});
        this.addParam({type:"slider", class:"I3", x:80, y:77, min:0, max:100, step:1, val:0, l:"3", lx:80, ly:167});
        this.addParam({type:"slider", class:"M", x:110, y:77, min:0, max:100, step:1, val:20, l:"Main", lx:110, ly:167});
        this.addParam({type:"input", class:"i1", x:20, y:63, md:"u", target:this.nodeI1});
        this.addParam({type:"input", class:"i2", x:50, y:63, md:"u", target:this.nodeI2});
        this.addParam({type:"input", class:"i3", x:80, y:63, md:"u", target:this.nodeI3});
        setInterval(()=>{
            this.drawGraph();
        }, 200);
        this.drawGraph = ()=>{
            if(!this.ctx) {
                this.cv = document.getElementById("outmix.scope");
                this.ctx = this.cv.getContext("2d");
            }
            this.nodeAnalyser.getByteTimeDomainData(this.ar);
            for(let i = 1; i < 99; ++i) {
                this.ctx.fillStyle = "#000";
                this.ctx.fillRect(i, 0, 1, 100);
                this.ctx.fillStyle = "#0f0";
                this.ctx.fillRect(i, 50 - (this.ar[i] -128) * 45/128, 1, 2);
            }
        };
        this.div.addEventListener("input", (ev)=>{
            if(ev.target.className == "M")
                this.nodeOut.gain.value = ev.target.value * 0.01;
            else {
                this['node'+ev.target.className].gain.value = ev.target.value * 0.01;
            }
        });
    }
}
class VCO extends Module {
    constructor(rack, name) {
        super(name, 100,560);
        this.rack = rack;
        this.type = "VCO";
        this.wavCurveClip = new Float32Array(256);
        for(let i = 0; i<256; ++i)
            this.wavCurveClip[i] = (i < 128)? -1: 1;
        this.wavForm = ['sine','square','sawtooth','triangle'];
        this.form = 0;
        this.pwmOn = 0;
        this.oct = 0;
        this.tune = 0;
        this.fine = 0;
        this.nodeOut = new GainNode(this.rack.actx);
        this.nodeShaper = new WaveShaperNode(this.rack.actx);
        this.nodeShaper.curve = this.wavCurveClip;
        this.nodePwmOffset = new ConstantSourceNode(this.rack.actx, {offset:0});
        this.nodePwmOffset.start();
        this.nodePwmMod = new GainNode(this.rack.actx, {gain:0});
        this.nodePwmMod.connect(this.nodePwmOffset.offset);
        this.nodeOsc = new OscillatorNode(this.rack.actx, {frequency:130.8127826502993});
        this.nodeOsc.connect(this.nodeShaper);
        this.nodePwmOffset.connect(this.nodeShaper);
        this.nodeOsc.start();
        this.nodeOsc.connect(this.nodeOut);
        this.nodeM1 = new GainNode(this.rack.actx, {gain:12000});
        this.nodeM2 = new GainNode(this.rack.actx, {gain:0});
        this.nodeM3 = new GainNode(this.rack.actx, {gain:0});
        this.nodeM1.connect(this.nodeOsc.detune);
        this.nodeM2.connect(this.nodeOsc.detune);
        this.nodeM3.connect(this.nodeOsc.detune);
        this.addElm({type:"title", label:"VCO", x:0, y:0});
        this.addParam({type:"output", class:"o", x:80, y:63, l:"Out", lx:80, ly:25, md:"u", target:this.nodeOut});
        this.addParam({type:"input", class:"pi", x:20, y:63, l:"Pwm", lx:20, ly:25, md:"u", target:this.nodePwmMod});
        this.addParam({type:"slider", class:"PM", x:20, y:77, val:0, min:0, max:100, step:1, l:"Mod", lx:20, ly:167});
        this.addParam({type:"slider", class:"PMn", x:50, y:77, val:0, min:0, max:100, step:1, l:"Man", lx:50, ly:167});
        this.addParam({type:"switch", class:"POn", x:80, y:145, val:0, l:"On", lx:80, ly:167});
        this.addElm({type:"text", label:"\u2517\u2501 Pwm \u2501\u251b", x:50, y:180});
        this.addParam({type:"slider", class:"Oct", x:20, y:215, h:50, val:0, min:-2, max:2, step:1, l:"Oct", lx:30, ly:200});
        this.addElm({type:"text", label:"+2", x:37, y:215});
        this.addElm({type:"text", label:"0", x:37, y:233});
        this.addElm({type:"text", label:"-2", x:37, y:251});
        this.addParam({type:"slider", class:"Frm", x:60, y:215, h:50, val:0, min:0, max:3, step:1, l:"Form", lx:80, ly:200});
        this.addElm({type:"text", label:svgWavTri, x:85, y:215});
        this.addElm({type:"text", label:svgWavSaw, x:85, y:227});
        this.addElm({type:"text", label:svgWavSqr, x:85, y:239});
        this.addElm({type:"text", label:svgWavSin, x:85, y:251});
        this.addParam({type:"knob", class:"Tun", x:50, y:275, d:45, val:0, min:-24, max:24, step:1, vx:10, vy:305, l:"Tune", lx:20, ly:280});
        this.addParam({type:"knob", class:"Fin", x:50, y:335, d:45, val:0, min:-200, max:200, step:1, vx:10, vy:365, l:"Fine", lx:20, ly:340});
        this.addParam({type:"slider", class:"M1", x:20, y:395, val:100, min:0, max:100, step:1});
        this.addParam({type:"slider", class:"M2", x:50, y:395, val:0, min:0, max:100, step:1});
        this.addParam({type:"slider", class:"M3", x:80, y:395, val:0, min:0, max:100, step:1});
        this.addParam({type:"input", class:"m1", x:20, y:498, l:"1", lx:20, ly:522, target:this.nodeM1});
        this.addParam({type:"input", class:"m2", x:50, y:498, l:"2", lx:50, ly:522, target:this.nodeM2});
        this.addParam({type:"input", class:"m3", x:80, y:498, l:"3", lx:80, ly:522, target:this.nodeM3});
        this.addElm({type:"text", label:"\u2517\u2501 Mod \u2501\u251b", x:50, y:535});
        this.div.addEventListener("change", (ev)=>{
            if(ev.target.className == "POn") {
                if(ev.target.value != this.pwmOn) {
                    this.pwmOn = ev.target.value;
                    if(ev.target.value == 1) {
                        this.nodeOsc.disconnect(this.nodeOut);
                        this.nodeShaper.connect(this.nodeOut);
                        this.nodeOsc.type = "sawtooth";
                    }
                    else {
                        this.nodeShaper.disconnect(this.nodeOut);
                        this.nodeOsc.connect(this.nodeOut);
                        this.nodeOsc.type = this.wavForm[this.form];
                    }
                }
            }
        });
        this.div.addEventListener("input", (ev)=>{
            switch(ev.target.className) {
            case "Oct": this.oct = ev.target.value; break;
            case "Tun": this.tune = ev.target.value; break;
            case "Fin": this.fine = ev.target.value; break;
            }
            switch(ev.target.className) {
            case "Frm":
                this.form = ev.target.value;
                if(this.pwmOn == 0)
                    this.nodeOsc.type = this.wavForm[this.form];
                break;
            case "Oct": case "Tun": case "Fin":
                this.nodeOsc.detune.value = this.oct * 1200 + this.tune * 100 + this.fine;
                break;
            case "M1": case "M2": case "M3":
                this['node'+ev.target.className].gain.value = ev.target.value * 120;
                break;
            case "PMn":
                this.nodePwmOffset.offset.value = ev.target.value * 0.01;
                break;
            case "PM":
                this.nodePwmMod.gain.value = ev.target.value * 0.01;
                break;
            }
        });
    }
}
class VCF extends Module {
    constructor(rack, name) {
        super(name, 100,560);
        this.rack = rack;
        this.type = "VCF";
        this.nodeFilter = new BiquadFilterNode(this.rack.actx);
        this.nodeI1 = new GainNode(this.rack.actx, {gain:1});
        this.nodeI2 = new GainNode(this.rack.actx, {gain:0});
        this.nodeI3 = new GainNode(this.rack.actx, {gain:0});
        this.nodeI1.connect(this.nodeFilter);
        this.nodeI2.connect(this.nodeFilter);
        this.nodeI3.connect(this.nodeFilter);
        this.nodeM1 = new GainNode(this.rack.actx, {gain:12000});
        this.nodeM2 = new GainNode(this.rack.actx, {gain:0});
        this.nodeM3 = new GainNode(this.rack.actx, {gain:0});
        this.nodeM1.connect(this.nodeFilter.detune);
        this.nodeM2.connect(this.nodeFilter.detune);
        this.nodeM3.connect(this.nodeFilter.detune);
        this.addElm({type:"title", label:"VCF", x:0, y:0});
        this.addElm({type:"text", label:"\u250f\u2501 Input \u2501\u2513", x:50, y:25});
        this.addParam({type:"input", class:"i1", x:20, y:63, md:"u", target:this.nodeI1});
        this.addParam({type:"input", class:"i2", x:50, y:63, md:"u", target:this.nodeI2});
        this.addParam({type:"input", class:"i3", x:80, y:63, md:"u", target:this.nodeI3});
        this.addParam({type:"slider", class:"I1", x:20, y:77, val:100, min:0, max:100, step:1, l:"1", lx:20, ly:167});
        this.addParam({type:"slider", class:"I2", x:50, y:77, val:0, min:0, max:100, step:1, l:"2", lx:50, ly:167});
        this.addParam({type:"slider", class:"I3", x:80, y:77, val:0, min:0, max:100, step:1, l:"3", lx:80, ly:167});
        this.addParam({type:"knob", class:"Frq", x:50, y:215, d:45, val:0, min:-24, max:24, step:1, vx:10, vy:245, l:"Freq", lx:20, ly:220});
        this.addParam({type:"knob", class:"Res", x:50, y:275, d:45, val:0, min:0, max:50, step:1, vx:10, vy:305, l:"Reso", lx:20, ly:280});
        this.addParam({type:"slider", class:"Typ", x:20, y:330, h:50, val:0, min:0, max:2, step:1});
        this.addElm({type:"text", label:"HP", x:40, y:330});
        this.addElm({type:"text", label:"BP", x:40, y:347});
        this.addElm({type:"text", label:"LP", x:40, y:364});
        this.addParam({type:"output", class:"o", x:80, y:368, l:"Out", lx:80, ly:330, md:"u", target:this.nodeFilter});
        this.addParam({type:"slider", class:"M1", x:20, y:395, val:100, min:0, max:100, step:1});
        this.addParam({type:"slider", class:"M2", x:50, y:395, val:0, min:0, max:100, step:1});
        this.addParam({type:"slider", class:"M3", x:80, y:395, val:0, min:0, max:100, step:1});
        this.addParam({type:"input", class:"m1", x:20, y:498, l:"1", lx:20, ly:522, target:this.nodeM1});
        this.addParam({type:"input", class:"m2", x:50, y:498, l:"2", lx:50, ly:522, target:this.nodeM2});
        this.addParam({type:"input", class:"m3", x:80, y:498, l:"3", lx:80, ly:522, target:this.nodeM3});
        this.addElm({type:"text", label:"\u2517\u2501 Mod \u2501\u251b", x:50, y:535});
        this.div.addEventListener("input", (ev)=>{
            switch(ev.target.className) {
            case "I1": case "I2": case "I3":
                this['node'+ev.target.className].gain.value = ev.target.value * 0.01;
                break;
            case "M1": case "M2": case "M3":
                this['node'+ev.target.className].gain.value = ev.target.value * 120;
                break;
            case "Frq":
                this.nodeFilter.detune.value = ev.target.value * 100;
                break;
            case "Res":
                this.nodeFilter.Q.value = ev.target.value;
                break;
            case "Typ":
                this.nodeFilter.type = ["lowpass", "bandpass", "highpass"][ev.target.value];
                break;
            }
        });
    }
}
class VCA extends Module {
    constructor(rack, name) {
        super(name, 100,560);
        this.rack = rack;
        this.type = "VCA";
        this.offset = 0;
        this.and1 = 0;
        this.and2 = 0;
        this.nodeGain1 = new GainNode(this.rack.actx, {gain:0});
        this.nodeGain2 = new GainNode(this.rack.actx, {gain:1});
        this.nodeGain3 = new GainNode(this.rack.actx, {gain:1});
        this.nodeI1 = new GainNode(this.rack.actx, {gain:1});
        this.nodeI2 = new GainNode(this.rack.actx, {gain:0});
        this.nodeI3 = new GainNode(this.rack.actx, {gain:0});
        this.nodeM1 = new GainNode(this.rack.actx, {gain:1});
        this.nodeM2 = new GainNode(this.rack.actx, {gain:0});
        this.nodeM3 = new GainNode(this.rack.actx, {gain:0});
        this.nodeI1.connect(this.nodeGain1);
        this.nodeI2.connect(this.nodeGain1);
        this.nodeI3.connect(this.nodeGain1);
        this.nodeGain1.connect(this.nodeGain2);
        this.nodeGain2.connect(this.nodeGain3);
        this.nodeM1.connect(this.nodeGain1.gain);
        this.nodeM2.connect(this.nodeGain1.gain);
        this.nodeM3.connect(this.nodeGain1.gain);
        this.addElm({type:"title", label:"VCA", x:0, y:0});
        this.addElm({type:"text", label:"\u250f\u2501 Input \u2501\u2513", x:50, y:25});
        this.addParam({type:"input", class:"i1", x:20, y:63, md:"u", target:this.nodeI1});
        this.addParam({type:"input", class:"i2", x:50, y:63, md:"u", target:this.nodeI2});
        this.addParam({type:"input", class:"i3", x:80, y:63, md:"u", target:this.nodeI3});
        this.addParam({type:"slider", class:"I1", x:20, y:77, val:100, min:0, max:100, step:1, l:"1", lx:20, ly:167});
        this.addParam({type:"slider", class:"I2", x:50, y:77, val:0, min:0, max:100, step:1, l:"2", lx:50, ly:167});
        this.addParam({type:"slider", class:"I3", x:80, y:77, val:0, min:0, max:100, step:1, l:"3", lx:80, ly:167});
        this.addParam({type:"knob", class:"Off", x:50, y:215, d:45, val:0, min:0, max:100, step:1, vx:10, vy:245, l:"Offset", lx:20, ly:220});
        this.addParam({type:"output", class:"o",x:80, y:323, l:"Out", lx:80, ly:285, md:"u", target:this.nodeGain3});
        this.addParam({type:"switch", class:"And1", x:35, y:370, val:0, l:"And", lx:50, ly:355});
        this.addParam({type:"switch", class:"And2", x:65, y:370, val:0});
        this.addParam({type:"slider", class:"M1", x:20, y:395, val:100, min:0, max:100, step:1});
        this.addParam({type:"slider", class:"M2", x:50, y:395, val:0, min:0, max:100, step:1});
        this.addParam({type:"slider", class:"M3", x:80, y:395, val:0, min:0, max:100, step:1});
        this.addParam({type:"input", class:"m1", x:20, y:498, l:"1", lx:20, ly:522, target:this.nodeM1});
        this.addParam({type:"input", class:"m2", x:50, y:498, l:"2", lx:50, ly:522, target:this.nodeM2});
        this.addParam({type:"input", class:"m3", x:80, y:498, l:"3", lx:80, ly:522, target:this.nodeM3});
        this.addElm({type:"text", label:"\u2517\u2501 Mod \u2501\u251b", x:50, y:535});
        this.div.addEventListener("change", (ev)=>{
            switch(ev.target.className) {
            case "And1":
                this.and1 = ev.target.value;
                if(this.and1) {
                    this.nodeGain2.gain.value = this.offset;
                    this.nodeM2.disconnect();
                    this.nodeM2.connect(this.nodeGain2.gain);
                }
                else {
                    this.nodeGain2.gain.value = 1;
                    this.nodeM2.disconnect();
                    this.nodeM2.connect(this.nodeGain1.gain);
                }
                break;
            case "And2":
                this.and2 = ev.target.value;
                if(this.and2) {
                    this.nodeGain3.gain.value = this.offset;
                    this.nodeM3.disconnect();
                    this.nodeM3.connect(this.nodeGain3.gain);
                }
                else {
                    this.nodeGain3.gain.value = 1;
                    this.nodeM3.disconnect();
                    this.nodeM3.connect(this.nodeGain1.gain);
                }
                break;
            }
        });
        this.div.addEventListener("input", (ev)=>{
            switch(ev.target.className) {
            case "I1": case "I2": case "I3": case "M1": case "M2": case "M3":
                this['node'+ev.target.className].gain.value = ev.target.value * 0.01;
                break;
            case "Off":
                this.offset = ev.target.value * 0.01;
                this.nodeGain1.gain.value = this.offset;
                if(this.and1)
                    this.nodeGain2.gain.value = this.offset;
                if(this.and2)
                    this.nodeGain3.gain.value = this.offset;
                break;
            }
        });
    }
}
class EG extends Module {
    constructor(rack, name) {
        super(name, 130, 560);
        this.rack = rack;
        this.type = "EG";
        this.nodeAdsr1 = new AdsrNode(this.rack.actx);
        this.addElm({type:"title", label:"EG", x:0, y:0});
        this.addParam({type:"slider", class:"A1", x:20, y:77, val:0, min:0, max:100, step:1, l:"A", lx:20, ly:167});
        this.addParam({type:"slider", class:"D1", x:50, y:77, val:0, min:0, max:100, step:1, l:"D", lx:50, ly:167});
        this.addParam({type:"slider", class:"S1", x:80, y:77, val:100, min:0, max:100, step:1, l:"S", lx:80, ly:167});
        this.addParam({type:"slider", class:"R1", x:110, y:77, val:1, min:0, max:100, step:1, l:"R", lx:110, ly:167});
        this.addParam({type:"input", class:"t1", x:20, y:63, md:"u", l:"Trig", lx:20, ly:25, target:this.nodeAdsr1.trigger});
        this.addParam({type:"output", class:"o1", x:110, y:63, md:"u", l:"Out", lx:110, ly:25, target:this.nodeAdsr1});
        this.nodeAdsr2 = new AdsrNode(this.rack.actx);
        this.addElm({type:"title", label:"EG", x:0, y:260});
        this.addParam({type:"slider", class:"A2", x:20, y:337, val:0, min:0, max:100, step:1, l:"A", lx:20, ly:430});
        this.addParam({type:"slider", class:"D2", x:50, y:337, val:0, min:0, max:100, step:1, l:"D", lx:50, ly:430});
        this.addParam({type:"slider", class:"S2", x:80, y:337, val:100, min:0, max:100, step:1, l:"S", lx:80, ly:430});
        this.addParam({type:"slider", class:"R2", x:110, y:337, val:1, min:0, max:100, step:1, l:"R", lx:110, ly:430});
        this.addParam({type:"input", class:"t2", x:20, y:323, md:"u", l:"Trig", lx:20, ly:285, target:this.nodeAdsr2.trigger});
        this.addParam({type:"output", class:"o2", x:110, y:323, md:"u", l:"Out", lx:110, ly:285, target:this.nodeAdsr2});
        this.div.addEventListener("input", (ev)=>{
            switch(ev.target.className) {
            case "A1": this.nodeAdsr1.attack.value = ev.target.value * 0.01; break;
            case "D1": this.nodeAdsr1.decay.value = ev.target.value * 0.01;  break;
            case "S1": this.nodeAdsr1.sustain.value = ev.target.value * 0.01; break;
            case "R1": this.nodeAdsr1.release.value = ev.target.value * 0.01; break;
            case "A2": this.nodeAdsr2.attack.value = ev.target.value * 0.01; break;
            case "D2": this.nodeAdsr2.decay.value = ev.target.value * 0.01;  break;
            case "S2": this.nodeAdsr2.sustain.value = ev.target.value * 0.01; break;
            case "R2": this.nodeAdsr2.release.value = ev.target.value * 0.01; break;
            }
        });
    }
}
class LFO extends Module {
    constructor(rack, name) {
        super(name, 100, 560);
        this.rack = rack;
        this.type = "LFO";
        this.nodeLfo1 = new OscillatorNode(this.rack.actx, {frequency:1});
        this.nodeOut1 = new GainNode(this.rack.actx);
        this.nodeLfo1.connect(this.nodeOut1);
        this.nodeLfo1.start();
        this.addElm({type:"title", label:"LFO", x:0, y:0});
        this.addParam({type:"output", class:"o1", x:80, y:63, md:"u", l:"Out", lx:80, ly:25, target:this.nodeOut1});
        this.addParam({type:"knob", class:"Frq1", x:50, y:90, d:45, val:1, min:0.1, max:100, step:0.1, log:1, vx:10, vy:120, l:"Freq", lx:25, ly:90});
        this.addParam({type:"slider", class:"Frm1", x:20, y:170, val:0, min:0, max:4, step:1, h:65, l:"Form", lx:25, ly:155});
        this.addElm({type:"text", label:svgWavTri, x:40, y:172});
        this.addElm({type:"text", label:svgWavSawR, x:40, y:184});
        this.addElm({type:"text", label:svgWavSaw, x:40, y:196});
        this.addElm({type:"text", label:svgWavSqr, x:40, y:208});
        this.addElm({type:"text", label:svgWavSin, x:40, y:220});
        this.nodeLfo2 = new OscillatorNode(this.rack.actx, {frequency:1});
        this.nodeOut2 = new GainNode(this.rack.actx);
        this.nodeLfo2.connect(this.nodeOut2);
        this.nodeLfo2.start();
        this.addElm({type:"title", label:"LFO", x:0, y:260});
        this.addParam({type:"output", class:"o2", x:80, y:323, md:"u", l:"Out", lx:80, ly:285, target:this.nodeOut2});
        this.addParam({type:"knob", class:"Frq2", x:50, y:350, d:45, val:1, min:0.1, max:100, step:0.1, log:1, vx:10, vy:380, l:"Freq", lx:25, ly:350});
        this.addParam({type:"slider", class:"Frm2", x:20, y:430, val:0, min:0, max:4, step:1, h:65, l:"Form", lx:25, ly:415});
        this.addElm({type:"text", label:svgWavTri, x:40, y:432});
        this.addElm({type:"text", label:svgWavSawR, x:40, y:444});
        this.addElm({type:"text", label:svgWavSaw, x:40, y:456});
        this.addElm({type:"text", label:svgWavSqr, x:40, y:468});
        this.addElm({type:"text", label:svgWavSin, x:40, y:480});
        this.div.addEventListener("input", (ev)=>{
            switch(ev.target.className) {
            case "Frq1":
                this.nodeLfo1.frequency.value = ev.target.value;
                break;
            case "Frq2":
                this.nodeLfo2.frequency.value = ev.target.value;
                break;
            case "Frm1":
                this.nodeLfo1.type = ["sine", "square", "sawtooth", "sawtooth", "triangle"][ev.target.value];
                if(ev.target.value == 2)
                    this.nodeOut1.gain.value = -1;
                else
                    this.nodeOut1.gain.value = 1;
                break;
            case "Frm2":
                this.nodeLfo2.type = ["sine", "square", "sawtooth", "sawtooth", "triangle"][ev.target.value];
                if(ev.target.value == 2)
                    this.nodeOut2.gain.value = -1;
                else
                    this.nodeOut2.gain.value = 1;
                break;
            }
        });
    }
}
class MISC extends Module {
    constructor(rack, name) {
        super(name, 100, 560);
        this.rack = rack;
        this.type = "MISC";
        this.nodeRing = new GainNode(this.rack.actx, {gain:0});
        this.addParam({type:"input", class:"rx", x:30, y:113, md:"u", l:"X", lx:30, ly:75, target:this.nodeRing});
        this.addParam({type:"input", class:"ry", x:70, y:113, md:"u", l:"Y", lx:70, ly:75, target:this.nodeRing.gain});
        this.addParam({type:"output", class:"ro", x:50, y:63, md:"u", l:"Out", lx:50, ly:25, target:this.nodeRing});

        this.nodeSH = new SHNode(this.rack.actx);
        this.addParam({type:"input", class:"si", x:30, y:243, md:"u", l:"In", lx:30, ly:205, target:this.nodeSH});
        this.addParam({type:"input", class:"st", x:50, y:293, md:"u", l:"Trig", lx:50, ly:255, target:this.nodeSH.trigger});
        this.addParam({type:"output", class:"so", x:70, y:243, md:"u", l:"Out", lx:70, ly:205, target:this.nodeSH});

        this.nodeNoise = new NoiseNode(this.rack.actx);

        const buf = new Float32Array(rack.actx.sampleRate*2);
        for(let i = 0; i < rack.actx.sampleRate*2; ++i)
            buf[i] = (Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() - 3)/3;
        this.noiseBuff = new AudioBuffer({length:rack.actx.sampleRate, numberOfChannels:1, sampleRate:rack.actx.sampleRate});
        this.noiseBuff.copyToChannel(buf, 0);
        this.nodeWhiteNoise = new AudioBufferSourceNode(this.rack.actx, {buffer:this.noiseBuff, loop:true});
        this.nodeWhiteNoise.start();
        const feedforward = new Float32Array([0.049922035 * 4, -0.095993537 * 4, 0.050612699 * 4, -0.004408786 * 4]);
        const feedback = new Float32Array([1, -2.494956002, 2.017265875, -0.522189400])
        this.nodePinkFilter = new IIRFilterNode(rack.actx, {feedforward:feedforward, feedback:feedback});
        this.nodeNoise.connect(this.nodePinkFilter);
        this.addElm({type:"title", label:"RING", x:0, y:0});
        this.addElm({type:"title", label:"S/H", x:0, y:180});
        this.addElm({type:"title", label:"NOISE", x:0, y:360});
        this.addParam({mod:this, type:"output", class:"wo", x:70, y:428, md:"u", l:"White", lx:70, ly:390, target:this.nodeNoise});
        this.addParam({mod:this, type:"output", class:"po", x:30, y:428, md:"u", l:"Pink", lx:30, ly:390, target:this.nodePinkFilter});
    }
}
class KEYBOARD extends Module {
    constructor(rack, name) {
        super(name, 950,170,20,600);
        this.rack = rack;
        this.type = "KBD";
        this.nodeCV = new ConstantSourceNode(this.rack.actx, {offset:0});
        this.nodeCV.start();
        this.nodeGate = new ConstantSourceNode(this.rack.actx, {offset:0});
        this.nodeGate.start();
        this.mml = new MML(rack.actx, this);
        this.glideVal = 0;
        this.loop = 0;
        this.addElm({type:"title", label:"KEYBOARD", x:0, y:0});
        this.addParam({type:"output", class:"cv", x:530, y:30, md:"d", l:"CV", lx:530, ly:65, target:this.nodeCV});
        this.addParam({type:"output", class:"gt", x:560, y:30, md:"d", l:"Gate", lx:560, ly:65, target:this.nodeGate});
        this.addParam({type:"knob", class:"Gl", x:525, y:90, d:45, val:0, min:0, max:100, step:1, l:"Glide", lx:545, ly:140});
        this.addElm({type:"keyboard", id:"keyboard", x:20, y:50});
        this.addElm({type:"text", label:"MML", x:600, y:30});
        this.addParam({type:"mml", class:"Mml", x:600, y:55, val:""});
        this.addParam({type:"switch", class:"Play", x:650, y:24, val:0, temp:1, l:"", lx:650, ly:140, src:"images/play.png", w:80, h:27});
        this.addParam({type:"switch", class:"Lp", x:760, y:28, val:0, l:"Loop", lx:790, ly:32});
        this.div.addEventListener("change", (ev)=>{
            switch(ev.target.id) {
            case "kbd.Lp":
                this.loop = ev.target.value;
                break;
            case "keyboard":
                this.note(ev.note[0], ev.note[1], this.rack.actx.currentTime);
                break;
            case "kbd.Play":
                if(ev.target.value) {
                    const strMml = document.getElementById("kbd.Mml").value;
                    this.mml.setMml(strMml);
                    this.Play(1);
                }
                else {
                    this.Play(0);
                }
                break;
            }
        });
        this.div.addEventListener("input", (ev)=>{
            switch(ev.target.className) {
            case "Gl":
                this.glideVal = Math.pow(100, ev.target.value * 0.01) * 0.01;
                break;
            }
        });
    }
    Play(s) {
        if(s) {
            this.mml.play();
        }
        else {
            this.mml.stop();
            document.getElementById("kbd.Play").setValue(0);
        }
    }
    note(on, note, time) {
        if(on) {
            this.nodeGate.offset.setTargetAtTime(1, time, 0.005);
            this.nodeCV.offset.setTargetAtTime(note * (0.1/12), time, this.glideVal);
        }
        else {
            this.nodeGate.offset.setTargetAtTime(0, time, 0.005);
        }
    }
}
class Rack {
    constructor(rackElm) {
        this.rackElm = rackElm;
        this.modules = [];
        this.actx = new AudioContext();
        this.splash = document.getElementById("splash");
        this.splashbutton = document.getElementById("splashbutton");
        this.menupane = document.getElementById("menupane");
        this.menucancel = document.getElementById("menucancel");
        this.menuok = document.getElementById("menuok");
        this.splashbutton.addEventListener("click", ()=>{this.start()});
        this.menucancel.addEventListener("click", ()=>{
            this.menupane.style.display = "none";
        });
        this.menuok.addEventListener("click", ()=>{
            this.menupane.style.display = "none";
            this.disconnect(this.focus);
        });
        this.connection = {};
        this.rackElm.addEventListener("pointermove", (ev)=>{
//            console.log("ev", ev.clientX, ev.clientY);
//            const px = ev.clientX - rc.left - 30;
//            const py = ev.clientY - rc.top - 30;
//            const rc = this.rackElm.getBoundingClientRect();
//            rack.draw();
//            const imgd = cable.ctx.getImageData(px, py, 60, 60);
//            for(let y = 0; y < 60; ++y) {
//                for(let x = 0; x < 60; ++x) {
//                    imgd.data[(x + y*60)*4 + 3] *= 0.1;
//                }
//            }
//            cable.ctx.putImageData(imgd, px, py);
        });
        for(let k in demoPatch) {
            const o = document.createElement("option");
            o.innerText = k;
            document.getElementById("demo").appendChild(o);
        }
    }
    start() {
        console.log("rack.start");
        this.actx.resume();
        this.splash.style.display = "none";
    }
    add(mod) {
        this.modules.push(mod);
        this.rackElm.appendChild(mod.div);
        this.draw();
    }
    findJack(x, y) {
        const elm = document.elementFromPoint(x,y);
        if(elm) {
            const param2 = elm.parentNode.parentNode.param;
            if(param2 && (param2.type == "input" || param2.type == "output")) {
                return param2;
            }
        }
        return null;
    }
    getPoint(param) {
        const r0 = rack.rackElm.getBoundingClientRect();
        const rc = param.mod.div.getBoundingClientRect();
        return {x:rc.left - r0.left + param.x - 1, y:rc.top - r0.top + param.y + 1};
    }
    findParam(id) {
        const mp = id.split(".");
        for(let m of this.modules) {
            if(m.id == mp[0]) {
                for(let p of m.params) {
                    if(p.id == id)
                        return p;
                }
            }
        }
        return null;
    }
    connect(param1, param2) {
        let t;
        if(typeof(param1) == "string")
            param1 = this.findParam(param1);
        if(typeof(param2) == "string")
            param2 = this.findParam(param2);
        if(param1.type == "input" && param2.type == "output") {
            t = param1; param1 = param2; param2 = t; 
        }
        const oldconn = this.connection[param2.id];
        if(oldconn) {
            this.disconnect(param2);
        }
        param1.target.connect(param2.target);
        this.connection[param2.id] = [param1, param2];
        this.draw();
    }
    disconnect(param) {
        if(typeof(param) == "string")
            param = this.findParam(param);
        if(param.type == "input") {
            if(this.connection[param.id]) {
                this.connection[param.id][0].target.disconnect(this.connection[param.id][1].target);
                delete this.connection[param.id];
            }
        }
        else {
            for(let p in this.connection) {
                if(this.connection[p][0] == param){
                    this.connection[p][0].target.disconnect(this.connection[p][1].target);
                    delete this.connection[p];
                }
            }
        }
        this.draw();
    }
    draw() {
        cable.clear();
        for(let id in this.connection) {
            const conn = this.connection[id];
            const p1 = this.getPoint(conn[0]);
            const p2 = this.getPoint(conn[1]);
            cable.drawCable(p1.x, p1.y, p2.x, p2.y);
        }
    }
    clear() {
        console.log("clear");
        for(const m of this.modules) {
            for(const p of m.params) {
                p.setValue(p.val);
            }
        }
    }
    loadStr(str) {
        rack.modules[0].Play(0);
        const fileobj = JSON.parse(str);
        this.clear();
        for(const m of fileobj) {
            for(let i = 0; i < rack.modules.length; ++i) {
                if(rack.modules[i].id == m.id) {
                    for(const p in m) {
                        switch(p) {
                        case "id": case "type":
                            break;
                        default:
                            for(let j = 0; j < rack.modules[i].params.length; ++j) {
                                const param = rack.modules[i].params[j];
                                if(param.class == p) {
                                    param.setValue(m[p]);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    load() {
        const finput = document.createElement("input");
        finput.type = "file";
        finput.addEventListener("change",(ev)=>{
            const reader = new FileReader();
            reader.onload = (ev)=>{
                this.loadStr(reader.result);
            };
            reader.readAsText(ev.target.files[0]);
        });
        finput.click();
    }
    loadDemo() {
        console.log("loadDemo");
        const s = document.getElementById("demo");
        this.loadStr(demoPatch[s.value]);
    }
    save() {
        const s = this.getParams();
        const blob = new Blob([s], {type:"octet/stream"});
        const a = document.createElement("a");
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = "untitle.json";
        a.click();
        window.URL.revokeObjectURL(url);
    }
    getParams() {
        let s = '';
        for(const m of this.modules) {
            s += ',';
            s += m.getParams();
        }
        s = '[' + s.substring(1) + ']';
        return s;
    }
    setParams(json) {

    }
}
class Cable {
    constructor(cableElm) {
        this.cableElm = cableElm;
        this.ctx = this.cableElm.getContext("2d");
        this.colors = ["rgb(255,0,0)","rgb(0,255,0)","rgb(0,0,255)","rgb(255,255,0)","rgb(0,255,255)","rgb(255,0,255)"];
        this.colidx = 0;
    }
    clear() {
        this.colidx = 0;
        cable.ctx.clearRect(0,0,1200,780);
    }
    drawCable(x1, y1, x2, y2) {
        const mx = (x1 + x2) * 0.5;
//        const my = (y1 + y2) * 0.5;
        const my = Math.max(y1, y2);
        cable.ctx.lineWidth = 6;
        cable.ctx.lineCap = "round";
        cable.ctx.strokeStyle="rgb(1,1,1)";
        cable.ctx.beginPath();
        cable.ctx.moveTo(x1+2, y1);
        cable.ctx.bezierCurveTo(mx, my + 40, mx, my + 40, x2+2, y2);
        cable.ctx.stroke();
        cable.ctx.strokeStyle=this.colors[this.colidx];
        cable.ctx.lineWidth = 3;
        cable.ctx.stroke();
        if(++this.colidx >= this.colors.length)
            this.colidx = 0;
    }
    drawMark(x, y, type) {
        cable.ctx.lineWidth = 3;
        switch(type) {
        case 0:
            cable.ctx.strokeStyle = "#f00";
            cable.ctx.beginPath();
            cable.ctx.moveTo(x - 8, y - 8);
            cable.ctx.lineTo(x + 8, y + 8);
            cable.ctx.moveTo(x + 8, y - 8);
            cable.ctx.lineTo(x - 8, y + 8);
            cable.ctx.stroke();
            break;
        case 1:
            cable.ctx.strokeStyle = "#0f0";
            cable.ctx.beginPath();
            cable.ctx.arc(x, y, 8, 0, 360, 0);
            cable.ctx.stroke();
            break;
        }
    }
}
class MML {
    constructor(actx, kbd) {
        this.actx = actx;
        this.kbd = kbd;
        this.mml = "";
        this.oct = 3;
        this.deflen = 8;
        this.tempo = 120;
        this.gt = 0;
        this.playTime = 0;
        this.index = -1;
        setInterval(()=>{
            while(this.index >= 0) {
                if(this.playTime > this.actx.currentTime + 0.1)
                    break;
                this.index = this.process(this.index);
                if(this.index < 0)
                    this.stop();
            }
        }, 100);
    }
    setMml(s) {
        this.mml = s;
    }
    play() {
        this.oct = 3;
        this.tempo = 120;
        this.deflen = 8;
        this.playTime = this.actx.currentTime+0.2;
        this.index = 0;
    }
    stop() {
        this.index = -1;
    }
    getNum(idx) {
        let n = 0;
        while(this.mml[idx] >= '0' && this.mml[idx] <= '9') {
            n = n * 10 + parseInt(this.mml[idx]);
            ++idx;
        }
        const r = [n, idx];
        return r;
    }
    note(n, idx) {
        ++idx;
        for(;;) {
            switch(this.mml[idx]) {
            case '+': case '#':
                ++n;
                ++idx;
                break;
            case '-':
                --n;
                ++idx;
                break;
            default:
                let len;
                [len, idx] = this.getNum(idx);
                if(len <= 0)
                    len = this.deflen;
                let st = 240 / (this.tempo * len);
                let st2 = st;
                while(this.mml[idx] == '.') {
                    ++idx;
                    st += (st2*0.5);
                }
                if(this.mml[idx] == '&' || this.mml[idx] == '^') {
                    ++idx;
                    this.gt = st;
                }
                else
                    this.gt = st * 0.8;
                if(n >= 0) {
                    let nn = (this.oct - 2) * 12 + n;
                    this.kbd.note(1, nn, this.playTime);
                    this.kbd.note(0, null, this.playTime + this.gt);
                }
                this.playTime += st;
                return idx;
            }
        }
    }
    process(idx) {
        if(idx < 0 || idx >= this.mml.length) {
            if(this.kbd.loop && this.mml.length > 0)
                return 0;
            this.kbd.Play(0);
            return -1;
        }
        switch(this.mml[idx].toUpperCase()) {
        case 'T':
            [this.tempo, idx] = this.getNum(idx + 1);
            if(this.tempo <= 0)
                this.tempo = 120;
            break;
        case 'V':
            idx = this.getNum(idx + 1)[1];
            break;
        case 'L':
            [this.deflen, idx] = this.getNum(idx + 1);
            break;
        case '>':
            ++idx;
            ++this.oct;
            break;
        case '<':
            ++idx;
            --this.oct;
            break;
        case 'O':
            [this.oct, idx] = this.getNum(idx + 1);
            break;
        case 'R': idx = this.note(-1, idx); break;
        case 'C': idx = this.note(0, idx); break;
        case 'D': idx = this.note(2, idx); break;
        case 'E': idx = this.note(4, idx); break;
        case 'F': idx = this.note(5, idx); break;
        case 'G': idx = this.note(7, idx); break;
        case 'A': idx = this.note(9, idx); break;
        case 'B': idx = this.note(11, idx); break;
        default:
            ++idx;
            break;
        }
        return idx;
    }
}
let rack, cable;
let modSerial = 1;

async function init() {
    console.log('init');
    cable = new Cable(document.getElementById("cablepane"));
    rack = new Rack(document.getElementById("rack"));
    await AdsrNode.Initialize(rack.actx);
    await SHNode.Initialize(rack.actx);
    await NoiseNode.Initialize(rack.actx);
    rack.add(new KEYBOARD(rack, "kbd"));
    rack.add(new VCO(rack, null));
    rack.add(new VCO(rack, null));
    rack.add(new VCF(rack, null));
    rack.add(new VCF(rack, null));
    rack.add(new VCA(rack, null));
    rack.add(new VCA(rack, null));
    rack.add(new EG(rack, null));
    rack.add(new LFO(rack, null));
    rack.add(new MISC(rack, null));
    rack.add(new OUTMIX(rack, "out"));
    rack.loadStr(demoPatch.demo1);
}

window.onload = () => {
    init();
}