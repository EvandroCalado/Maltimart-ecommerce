import ReactLoading from 'react-loading';

const Spinning = ({ width, height }) => (
  <ReactLoading type={'spin'} color={"#0a1d37"} width={width} height={height}/>
);

export default Spinning;