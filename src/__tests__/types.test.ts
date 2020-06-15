import { Predictor } from '../panels/prediction-panel/types/Predictor';
import { GrafanaData } from '../panels/prediction-panel/types/Data'
import { ArrayVector, DataFrame, FieldType, Field } from '@grafana/data';

let testData: DataFrame[] = [
    {
        fields: [
            {
                name: '',
                type: FieldType.time,
                config: {},
                values: new ArrayVector([123,321,456])
            },
            {
                name: '',
                type: FieldType.number,
                config: {},
                values: new ArrayVector([6,6,2])
            }
        ],
        length: 10
    },
    {
        fields: [
            {
                name: '',
                type: FieldType.time,
                config: {},
                values: new ArrayVector([123,321,456])
            },
            {
                name: '',
                type: FieldType.number,
                config: {},
                values: new ArrayVector([7,3,0])
            }
        ],
        length: 10
    }
];

//Test Predictor class
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

//Test Data class
test('inputGrafanaValues', () =>{
    const data = GrafanaData.readValues(testData);
    expect(data.inputGrafanaValues[0]).toStrictEqual([6,7,123]);
    expect(data.inputGrafanaValues[1]).toStrictEqual([6,3,321]);
    expect(data.inputGrafanaValues[2]).toStrictEqual([2,0,456]);
})




