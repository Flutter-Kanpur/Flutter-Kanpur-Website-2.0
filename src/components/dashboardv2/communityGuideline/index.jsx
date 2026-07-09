import React from "react";
import GuidelineCard from "./guidelineCard";

const guidelinesData = [
  {
    title: "Respect & Conduct",
    description:
      "We expect all members to interact with each other respectfully and professionally. Differences in opinions, experience levels, and perspectives are natural and welcome, but disrespectful behavior, harassment, or offensive language is not acceptable. Every member deserves to be treated with dignity.",
  },
  {
    title: "Inclusivity",
    description:
      "Flutter Kanpur is an inclusive community. We encourage patience, empathy, and support—especially toward beginners and new members. Avoid language or behavior that may discourage participation or make others feel unwelcome. Inclusivity helps the community grow stronger.",
  },
  {
    title: "Meaningful Participation",
    description:
      "Conversations, feedback, and contributions should be constructive and relevant. Healthy discussions are encouraged, but personal attacks, unnecessary negativity, or disruptive behavior reduce the value of the community. When offering feedback, focus on being helpful and respectful.",
  },
  {
    title: "Responsible Sharing",
    description:
      "Members are encouraged to share resources, projects, and opportunities that add value to the community. Excessive self-promotion, spam, or irrelevant advertising is discouraged. Sharing should always prioritize community benefit over personal promotion.",
  },
  {
    title: "Privacy & Trust",
    description:
      "Respecting privacy is essential. Do not share personal information, private conversations, or sensitive details without consent. Trust allows members and contributors to collaborate openly and confidently.",
  },
];

export default function CommunityGuidelines() {
  return (
    <div className="w-full min-h-screen bg-white text-gray-800 p-6 md:p-8 lg:p-10 overflow-y-auto">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
        >
          <span>&larr;</span> Back
        </button>
      </div>

      {/* Header Area - Kept clean as per Figma */}
      <div className="max-w-4xl mb-8 space-y-3">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Community Guidelines
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
          Flutter Kanpur is a collaborative space for developers, designers,
          learners, and contributors to connect, learn, and grow together. Our
          goal is to create an environment where everyone feels safe, respected,
          and encouraged to participate. These guidelines exist to maintain a
          healthy and welcoming community experience for all members.
        </p>
      </div>

      {/* Grid Layout for Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        {guidelinesData.map((guideline, index) => (
          <GuidelineCard
            key={index}
            title={guideline.title}
            description={guideline.description}
          />
        ))}
      </div>

      {/* Footer Text */}
      <div className="mt-12 pt-4 border-t border-gray-100 text-xs text-gray-400">
        Last Updated on April, 2026
      </div>
    </div>
  );
}
