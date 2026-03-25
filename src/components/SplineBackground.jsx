import Spline from '@splinetool/react-spline';

export default function SplineBackground({ scene }) {
  const defaultScene = "https://prod.spline.design/JhX5K9Ysh75aJq8A/scene.splinecode";

  return (
    <div
      className="spline-background"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,   /* NOTE: zIndex 0, NOT -1 so Spline canvas gets pointer events */
      }}
    >
      <Spline scene={scene || defaultScene} />
    </div>
  );
}
