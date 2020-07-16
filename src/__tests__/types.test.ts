import { Predictor } from '../panels/prediction-panel/types/Predictor';
import { GrafanaData } from '../panels/prediction-panel/types/Data';
import { ArrayVector, DataFrame, FieldType } from '@grafana/data';

let testData: DataFrame[] = [
  {
    fields: [
      {
        name: '',
        type: FieldType.time,
        config: {},
        values: new ArrayVector([123, 321, 456]),
      },
      {
        name: '',
        type: FieldType.number,
        config: {},
        values: new ArrayVector([6, 6, 2]),
      },
    ],
    length: 10,
  },
  {
    fields: [
      {
        name: '',
        type: FieldType.time,
        config: {},
        values: new ArrayVector([123, 321, 456]),
      },
      {
        name: '',
        type: FieldType.number,
        config: {},
        values: new ArrayVector([7, 3, 0]),
      },
    ],
    length: 10,
  },
];

//Test Predictor class
test('predictor RL well formed', () => {
  let predictor = new Predictor('rl', 25, [0.350323388550426, -0.7840651228251652], [4, 2, 0], undefined);
  const json = Predictor.readJson(
    '{"type":"rl","predictor":{"tuples":25,"coefficents":{"blandChromatin":0.350323388550426,"clumpThickness":0.40038369156958814,"marginalAdhesion":0.26857541776429206,"mitoses":-0.16765270057008674},"intercept":-0.7840651228251652,"target":"uniformityOfCellSize"},"notes":""}'
  );
  expect(predictor.type).toBe(json.type);
  expect(predictor.tuples).toBe(json.tuples);
  expect(predictor.coefficients).toStrictEqual(json.coefficients);
});

test('predictor RL not well formed', () => {
  expect(() => {
    Predictor.readJson('{"type": "RLsvmd","tuples": 69,"coeffiients": [3,2,5,7],"svW": [4,2,0]}');
  }).toThrowError('File mal formato');
});

test('predictor empty', () => {
  expect(() => {
    Predictor.readJson('');
  }).toThrowError('Seleziona prima il file!');
});

//Test Data class
test('inputGrafanaValues', () => {
  const data = GrafanaData.readValues(testData);
  expect(data.inputGrafanaValues[0]).toStrictEqual([123, 123, 6]);
  expect(data.inputGrafanaValues[1]).toStrictEqual([321, 321, 6]);
  expect(data.inputGrafanaValues[2]).toStrictEqual([456, 456, 2]);
});
