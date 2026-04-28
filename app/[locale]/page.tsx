import { TeamVote } from "@/components/team-vote";
import { EventDetails } from "@/components/event-details";
import { LocationMap } from "@/components/location-map";
import { MessageSection } from "@/components/message-section";
import { CountdownShare } from "@/components/countdown-share";
import { Footer } from "@/components/footer";
import { BackgroundMusic } from "@/components/background-music";
import { HeroSection } from "@/components/hero-section";

export default function BabyShowerPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fffaf5_0%,#fff7fb_20%,#f7fbff_100%)]">
      {/* <BackgroundMusic /> */}
      <HeroSection />
      <div className="relative z-10">
        <MessageSection />
        <TeamVote />
        <EventDetails />
        {/* <CountdownShare /> */}
        <LocationMap />
        <Footer />
      </div>
    </main>
  );
}
