import { all, ForkEffect } from 'redux-saga/effects';

type RootSagaType = (() => Generator<ForkEffect<never>, void, unknown>)[]

function loadSagas(sagas: RootSagaType) {
    return sagas.map(sagaFn => sagaFn());
}

export function createRootSaga(sagas: RootSagaType) {
    return function* () {
        yield all(loadSagas(sagas));
    };
}
