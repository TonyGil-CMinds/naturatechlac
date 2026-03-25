import Spline from '@splinetool/react-spline';

export default function SplineBackground({ scene }) {
  // We provide a fallback Spline URL so you can see it working immediately.
  // Replace this URL with your custom exported Spline scene URL.
  const defaultScene = "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode";

  return (
    <div className="spline-background" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Spline scene={scene || defaultScene} />
    </div>
  );
}
