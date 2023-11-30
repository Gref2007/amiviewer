/**
 * @jest-environment jsdom
 */

import { init, redrawGrah } from '../NetworkLib.js';

var mockActions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var mockcalledActions = [];

beforeEach(() => {
  mockcalledActions = [];
});

jest.mock('../NetworkLib.js', () => {
  const originalModule = jest.requireActual('../NetworkLib.js');
  return {
    __esModule: true,
    ...originalModule,
    createVirtualNetwork: jest.fn((container, actionsJson) => {
    }),
    drawAction: jest.fn((action) => {
      mockcalledActions.push(action);
    }),
    eraseAction: jest.fn((action) => {
      mockcalledActions.push(action);
    })
  };
});

describe('Correct work with selected index items', () => {

  test('current 0 select 3 ', () => {
    init("asdf", mockActions);
    redrawGrah(0, 3);
    expect(mockcalledActions.sort()).toEqual([1, 2, 3].sort());
  });

  test('current 5 select 1 ', () => {
    init("asdf", mockActions);
    redrawGrah(5, 1);
    expect(mockcalledActions.sort()).toEqual([5, 4, 3, 2].sort());
  });

  test('current 4 select 5 ', () => {
    init("asdf", mockActions);
    redrawGrah(4, 5);
    expect(mockcalledActions.sort()).toEqual([5].sort());
  });

  test('current 5 select 4 ', () => {
    init("asdf", mockActions);
    redrawGrah(5, 4);
    expect(mockcalledActions.sort()).toEqual([5].sort());
  });
});

