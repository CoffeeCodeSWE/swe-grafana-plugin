import {  Predictor } from '../panels/prediction-panel/types/Predictor';

test('predictor RL well formed', () => {
    let predictor = new Predictor("RL", 69, [3,2,5,7],[4,2,0],undefined);
    const json = Predictor.readJson('{"type": "RL","tuples": 69,"coefficients": [3,2,5,7],"svmW": [4,2,0]}');
    expect(predictor.type).toBe(json.type);
    expect(predictor.tuples).toBe(json.tuples);
    expect(predictor.coefficients).toStrictEqual(json.coefficients);
    expect(predictor.svmW).toStrictEqual(json.svmW);
    expect(predictor.opt).toBe(json.opt);
});

test('predictor RL not well formed', () => {
    expect(() => {
        Predictor.readJson('{"type": "RLsvmd","tuples": 69,"coeffiients": [3,2,5,7],"svW": [4,2,0]}');
    }).toThrowError('File mal formato');
})

test('predictor empty', () => {
    expect(() => {
        Predictor.readJson('');
    }).toThrowError('Seleziona prima il file!');
})
