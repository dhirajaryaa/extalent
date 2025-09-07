import { Navbar } from "@/components/custom";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  FileText,
  LayoutDashboard,
  Target,
  SquarePlay,
  ArrowRight,
} from "lucide-react";

function LandingPage() {
  const features = [
    {
      title: "Smart Job Matching",
      description:
        "AI-powered engine that finds roles perfectly aligned with your resume and skills.",
      icon: Briefcase,
    },
    {
      title: "Resume Insights",
      description:
        "Get instant feedback on strengths and gaps to make your profile stand out.",
      icon: FileText,
    },
    {
      title: "Career Dashboard",
      description:
        "Track applications, matches, and progress in one simple dashboard.",
      icon: LayoutDashboard,
    },
    {
      title: "Skill Gap Guidance",
      description:
        "Discover the skills you need to learn next for better opportunities.",
      icon: Target,
    },
  ];

  return (
    <main className="w-full min-h-screen  bg-gradient-to-b from-slate-50 to-primary/30 ">
      <section className="w-full h-full max-w-4xl mx-auto relative">
        <Navbar />
        {/* hero  */}
        <div
          className="flex items-center gap-3 justify-center flex-col text-center
        my-30"
        >
          {/* label  */}
          <div className="flex items-center gap-3 border border-chart-1 bg-chart-1/20 px-5 py-2 rounded-full my-3">
            <span className="relative flex items-center justify-center size-4">
              <span className="absolute size-4 animate-ping rounded-full bg-chart-1/30"></span>
              <span className="relative size-3 rounded-full bg-chart-1"></span>
            </span>
            <span className="text-xs font-semibold text-chart-1">
              Preview Mode
            </span>
          </div>
          <h1 className="text-3xl font-bold text-primary sm:text-4xl md:text-5xl">
            🚀 Find Your Best Job Match in Minutes
          </h1>
          <p className="text-sm text-gray-600 sm:text-lg w-xl">
            JobFit helps candidates discover roles that match their skills,
            resume, and goals—powered by AI insights.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <Button className="cursor-pointer flex gap-2 items-center sm:text-[14px]">
              Get Started Free <ArrowRight size={18} />
            </Button>
            <Button
              variant="outline"
              className={
                "cursor-pointer flex gap-2 items-center sm:text-[14px]"
              }
            >
              How it work
              <SquarePlay size={18} />
            </Button>
          </div>
        </div>
        {/* features  */}
        <div className="flex items-center gap-3 justify-center flex-col text-center">
          <h2 className="font-semibold sm:text-2xl text-xl text-gray-800">
            Main Features
          </h2>
          <p className="text-sm text-gray-600">
            Everything you need to find the right job—faster, smarter, and
            easier.
          </p>
          <div className="flex gap-4 items-center my-8 w-full justify-center flex-wrap">
            {features.map((feature) => {
              return (
                <div className="flex items-center gap-3 flex-col border-2 border-gray-200 rounded-xl p-4 w-full max-w-xs bg-background/50 shadow-lg">
                  {feature.icon && (
                    <feature.icon className="size-8 text-primary" />
                  )}
                  <h4 className="font-semibold text-sm sm:text-lg">
                    {feature.title}
                  </h4>
                  <p className="opacity-70 text-xs sm:text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
