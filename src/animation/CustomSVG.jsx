'use client'
import { useEffect, useRef } from 'react';

const CustomSVG = ({ width = 200, height = 200 }) => {
  const pathRef = useRef(null);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = length;
      pathRef.current.style.strokeDashoffset = length;
      pathRef.current.getBoundingClientRect();
      pathRef.current.style.transition = 'stroke-dashoffset 4s ease-in-out';
      pathRef.current.style.strokeDashoffset = '0';
    }
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1080 1080"
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "100%", transform: "translate3d(0px, 0px, 0px)", contentVisibility: "visible" }}
    >
      <defs>
        <clipPath id="__animation">
          <rect width="1080" height="1080" x="0" y="0" />
        </clipPath>
      </defs>
      <g clipPath="url(#__animation)">
        <g transform="matrix(1,0,0,1,560,540)" opacity="1" style={{ display: "block" }}>
          <g opacity="1" transform="matrix(1,0,0,1,0,0)">
            <path
              ref={pathRef}
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(255,185,185)"
              strokeOpacity="1"
              strokeWidth="17.12"
              d="M-405.3609924316406,344.23199462890625 C-210.30499267578125,503.8330078125 31.017000198364258,496.822998046875 130.02999877929688,387.4620056152344 C213.46400451660156,295.3080139160156 183.59500122070312,144.00799560546875 118.24099731445312,15.869999885559082 C87.43399810791016,-44.53300094604492 48.74100112915039,-99.78900146484375 10.3149995803833,-141.2779998779297 C-70.36599731445312,-228.38900756835938 -215.947998046875,-326.1440124511719 -275.6700134277344,-284.2699890136719 C-344.56201171875,-235.96600341796875 -304.1400146484375,1.5950000286102295 -165.93099975585938,141.3820037841797 C-34.49700164794922,274.3169860839844 200.9029998779297,334.5369873046875 316.25299072265625,244.47000122070312 C382.34600830078125,192.86300659179688 415.8160095214844,86.61399841308594 402.4620056152344,-44.48099899291992 C390.02899169921875,-166.52699279785156 337.01300048828125,-310.1059875488281 231.95700073242188,-451.1780090332031"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default CustomSVG;
