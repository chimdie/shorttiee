import { Helmet } from "react-helmet-async";

type HelmetProps = {
  title: string;
  description: string;
};

export default function HelmetHeader({ title, description }: HelmetProps) {
  return (
    <Helmet>
      <title>{title} || Shorttiee</title>
      <meta name="description" content={description}></meta>
    </Helmet>
  );
}
