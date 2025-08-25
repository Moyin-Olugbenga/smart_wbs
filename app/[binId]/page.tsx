
import { Bin } from "@/classes/Bin";
import GetBin from "@/components/notifyForm";

export default async function Page({ params }: { params: Promise<{ binId: string }> }) {
  // const binId = params.binId;
    const { binId } = await params; 

  const bin = await Bin.getBinById(binId);

  return <GetBin bin={bin} binId={binId} />;
}

