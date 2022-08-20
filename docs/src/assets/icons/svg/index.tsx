import { FC } from 'react';

// type
import type Props from '@/types/icon';

const index: FC<Props> = (props) => {
  const { fill = 'currentColor', size = '24', ...otherProps } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill={fill}
      {...otherProps}
    >
      <g>
        <g>
          <path
            d="M459.216,184.742V77.792L348.234,0H52.783v184.742H26.392v205.856h26.392V512h406.433V390.598h26.392V184.742H459.216z
			 M353.649,23.151l72.278,50.746h-72.278V23.151z M68.618,15.835h269.196v73.897h105.567v95.01H68.618V15.835z M443.381,496.165
			H68.618V390.598h374.763V496.165z M469.773,374.763H42.227V200.577h427.546V374.763z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M200.577,95.01V58.062h-52.784V36.948H89.732V95.01h58.062V73.897h36.948V95.01h-21.113v58.062h58.062V95.01H200.577z
			 M131.959,79.175h-26.392V52.784h26.392V79.175z M205.856,137.237h-26.392v-26.392h26.392V137.237z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M155.711,279.753h-21.113c-10.186,0-18.474-8.288-18.474-18.474c0-10.186,8.288-18.474,18.474-18.474h21.113
			c10.186,0,18.474,8.288,18.474,18.474h15.835c0-18.918-15.392-34.309-34.309-34.309h-21.113
			c-18.918,0-34.309,15.392-34.309,34.309c0,18.918,15.392,34.309,34.309,34.309h21.113c10.186,0,18.474,8.288,18.474,18.474
			c0,10.186-8.288,18.474-18.474,18.474h-21.113c-10.186,0-18.474-8.288-18.474-18.474h-15.835
			c0,18.918,15.392,34.309,34.309,34.309h21.113c18.918,0,34.309-15.392,34.309-34.309
			C190.021,295.144,174.629,279.753,155.711,279.753z"
          />
        </g>
      </g>
      <g>
        <g>
          <rect x="113.485" y="432.825" width="285.031" height="15.835" />
        </g>
      </g>
      <g>
        <g>
          <rect x="435.464" y="216.412" width="21.113" height="15.835" />
        </g>
      </g>
      <g>
        <g>
          <rect x="435.464" y="343.093" width="21.113" height="15.835" />
        </g>
      </g>
      <g>
        <g>
          <rect x="55.423" y="343.093" width="21.113" height="15.835" />
        </g>
      </g>
      <g>
        <g>
          <rect x="55.423" y="216.412" width="21.113" height="15.835" />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M366.845,300.866h34.309v7.918c0,0.071-0.115,7.336-4.235,14.546c-5.492,9.612-15.61,14.485-30.074,14.485
			c-28.006,0-34.309-9.772-34.309-13.196v-57.962c0.095-2.097,1.888-18.575,34.309-18.575c32.651,0,34.237,16.711,34.31,18.617
			l-0.001-0.143h15.835c0-0.96-0.197-9.621-7.014-18.142c-8.582-10.728-23.094-16.168-43.13-16.168
			c-20.037,0-34.549,5.44-43.13,16.168c-6.816,8.52-7.014,17.182-7.014,18.142v58.062c0,2.972,1.407,29.031,50.144,29.031
			c49.571,0,50.144-44.417,50.144-44.866v-23.753h-50.144V300.866z"
          />
        </g>
      </g>
      <g>
        <g>
          <polygon
            points="296.106,226.79 256,332.068 215.894,226.79 201.096,232.427 245.266,348.371 266.734,348.371 310.904,232.427 		
			"
          />
        </g>
      </g>
    </svg>
  );
};

export default index;