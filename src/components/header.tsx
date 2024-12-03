import React from "react";

const Header = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex items-baseline justify-between">
      <div>
        <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {children}
    </div>
  );
};

export default Header;
