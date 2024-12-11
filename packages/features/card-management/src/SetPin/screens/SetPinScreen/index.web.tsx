export function SetPinScreen({ src }: { src: string }) {
  return (
    <iframe
      style={{
        flex: 1,
      }}
      src={src}
    />
  );
}
