const Heading = ({ title }: { title: string }) => {
   return (
      <h2 className="text-5xl lg:text-7xl font-bold w-full underline">
         {title}
      </h2>
   );
};

export default Heading;
