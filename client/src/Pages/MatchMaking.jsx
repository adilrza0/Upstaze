import FindCoFounder from "@/components/Custom/FindCoFounder";
import FindStartup from "@/components/Custom/FindStartUps";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function MatchMaking() {
  return (
    <div>
      <h1 className="lg:text-3xl md:text-2xl sm:text-xl font-semibold m-6">
        Team MatchMaking
      </h1>
      <Tabs
        defaultValue="Available to Work as a Co-Founder"
        className="w-[80vw]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Available to Work as a Co-Founder">
            Available to Work as a Co-Founder
          </TabsTrigger>
          <TabsTrigger value="Looking for a Co-Founder">
            Looking for a Co-Founder
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Available to Work as a Co-Founder">
          <FindStartup/>
        </TabsContent>
        <TabsContent value="Looking for a Co-Founder">
          <FindCoFounder />
          
        </TabsContent>
      </Tabs>
    </div>
  );
}
