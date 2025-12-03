export default function FromHeader({ title, subTitle, deception }) {
  return (
    <div className="text-center">
      <h2 className="text-4xl lg:text-5xl font-bold text-[#FFFFFF] mb-4 text-nowrap">
        {title}
      </h2>

      <p className="text-[26px] font-semibold text-[#FFFFFF]">{subTitle}</p>

      <p className="text-base font-medium text-[#666666] mt-1">{deception}</p>
    </div>
  );
}
