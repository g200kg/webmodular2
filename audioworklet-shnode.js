class SHNode extends AudioWorkletNode {
  constructor(actx, options){
    super(actx, 'webaudio-sh', {
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 1,
      parameterData:options,
    });
    this.trigger = this.parameters.get('trigger');
  }
  static Initialize(actx){
    const shproc=`
    registerProcessor('webaudio-sh', class extends AudioWorkletProcessor {
      constructor(options){
        super();
        this._lasttrig = 0;
        this._trig = 0;
        this._value = 0;
      }
      static get parameterDescriptors() {
        return [
          {name: 'trigger', defaultValue: 0,  minValue: 0,  maxValue: 1,  automationRate: "a-rate"  },
        ];
      }
      process (inputs, outputs, parameters) {
        let output = outputs[0];
        let input = inputs[0];
        const trigs = parameters.trigger;
        if(trigs.length == 1)
          this._trig = trigs[0];
        for(let i = 0; i < output[0].length; ++i){
          if(trigs.length > 1)  this._trig = trigs[i];
          if(this._trig >= 0.5 && this._lasttrig < 0.5){
            this._value = input[0][i];
          }
          output[0][i] = this._value;
        }
        this._lasttrig = this._trig;
        return true;
      }
    });
    `;
    return actx.audioWorklet.addModule('data:text/javascript,'+encodeURI(shproc));
  }
}
