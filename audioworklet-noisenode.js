class NoiseNode extends AudioWorkletNode {
  constructor(actx, options){
    super(actx, 'webaudio-noise', {
      numberOfInputs: 0,
      numberOfOutputs: 1,
      channelCount: 1,
      parameterData:options,
    });
  }
  static Initialize(actx){
    const noiseproc=`
    registerProcessor('webaudio-noise', class extends AudioWorkletProcessor {
      constructor(options){
        super();
      }
      static get parameterDescriptors() {
        return [ ];
      }
      process (inputs, outputs, parameters) {
        let output = outputs[0];
        for(let i = 0; i < output[0].length; ++i){
          output[0][i] = (Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() - 3) * 0.333;
        }
        return true;
      }
    });
    `;
    return actx.audioWorklet.addModule('data:text/javascript,'+encodeURI(noiseproc));
  }
}
