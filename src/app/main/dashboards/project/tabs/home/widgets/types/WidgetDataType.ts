type ExtraData = {
	name: string;
	count: number;
};

type WidgetInnerData = {
	name: string;
	count: number;
	extra: ExtraData;
};

/**
 * The type definition for the data used to populate the widget.
 */
type WidgetDataType = {
	title?: string;
	ranges: string;
	currentRange?: string;
	data: WidgetInnerData;
	detail?: string;
};

// export type RangeType = 'DY' | 'DT' | 'DTM';

export default WidgetDataType;
