import { ComponentProps, FC, useEffect, useRef, useState } from "react";

interface LazySvgProps extends ComponentProps<"svg"> {
  name: string;
}

const useLazySvgImport = (name: string) => {
  const importRef = useRef<FC<ComponentProps<"svg">>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setLoading(true);
    const importIcon = async () => {
      try {
        importRef.current = (
          await import(`../assets/flags/${name}.svg`)
        ).default;
      } catch (err) {
        console.log(err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [name]);

  return {
    error,
    loading,
    Svg: importRef.current,
  };
};

export const LazySvg = ({ name, ...props }: LazySvgProps) => {
  const { loading, error, Svg } = useLazySvgImport(name);

  if (error) {
    return null;
  }

  if (loading) {
    return "...";
  }

  if (!Svg) {
    return null;
  }

  return <Svg {...props} className="w-6 h-6" />;
};
