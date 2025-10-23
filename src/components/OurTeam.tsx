import React from "react";
import { TeamMember } from "./TeamMember";

export const OurTeam = () => {
  const teamMembers = [
    {
      name: "Karivaradhan",
      role: "Founder & TeamLead",
      bio: "Passionate about creating innovative educational solutions. Leads the technical development and strategic direction of Aptora.",
      photoUrl: "/uploads/b94a9ece-7e3f-42eb-bc23-a5eb21a13b71.png",
      linkedin: "https://linkedin.com/in/karivaradhan",
      github: "https://github.com/karivaradhan",
      email: "kari@aptora.com"
    }
  ];

  return (
    <section id="team" className="py-16">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Our Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
            Meet the talented individuals behind Aptora's mission to transform education with AI.
          </p>
        </div>

        <div className="flex justify-center">
          {teamMembers.map((member) => (
            <TeamMember key={member.name} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};
