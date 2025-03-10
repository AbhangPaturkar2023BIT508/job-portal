import React from "react";
import { talents } from "../../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";
const RecommendedTalent = () => {
  return (
    <div>
      <div className="text-xl font-semibold mb-5">Recommended Talent</div>
      <div className="flex flex-col flex-wrap gap-5">
        {talents.map(
          (talent, index) => index < 4 && <TalentCard key={index} {...talent} />
        )}
      </div>
    </div>
  );
};

export default RecommendedTalent;
