import _ from '@lodash';
import FuseUtils from '@fuse/utils';
// import mockApi from '../mock-api.json';
import indicatorsMockApi from '../indicators-api.json'
import ExtendedMockAdapter, { Params } from '../ExtendedMockAdapter';
import indicator from "../../app/main/dashboards/indicators/indicator/Indicator";
import IndicatorsApi from "../../app/main/dashboards/indicators/IndicatorsApi";

let indicatorsDB = indicatorsMockApi.indicators.value as IndicatorsApi[];

export const indicatorApiMocks = (mock: ExtendedMockAdapter) => {
	mock.onGet('/indicators/all').reply(() => {
		console.log({indicatorsDB})
		return [200, indicatorsDB];
	});

	mock.onPost('/indicators/addindicator').reply(({ data }) => {
		const newindicator = { id: FuseUtils.generateGUID(), ...JSON.parse(data as string) } as indicator;

		indicatorsDB.unshift(newindicator);

		return [200, newindicator];
	});

	mock.onDelete('/indicators/deleteindicator').reply(({ data }) => {
		const ids = JSON.parse(data as string) as string[];

		indicatorsDB = indicatorsDB.filter((item) => !ids.includes(item.id));

		return [200, indicatorsDB];
	});

	mock.onGet('/indicators/all/:id').reply((config) => {
		const { id } = config.params as Params;

		const indicator = _.find(indicatorsDB, { id });

		if (indicator) {
			return [200, indicator];
		}

		return [404, 'Requested indicator does not exist.'];
	});

	mock.onPut('/indicators/all/:id').reply((config) => {
		const { id } = config.params as Params;

		_.assign(_.find(indicatorsDB, { id }), JSON.parse(config.data as string));

		return [200, _.find(indicatorsDB, { id })];
	});

	mock.onDelete('/indicators/all/:id').reply((config) => {
		const { id } = config.params as Params;

		_.remove(indicatorsDB, { id });

		return [200, id];
	});
};
