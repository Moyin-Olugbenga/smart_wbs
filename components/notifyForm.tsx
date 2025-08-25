"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Bin as _Bin} from "@prisma/client"
import { Bin } from "@/classes/Bin"

const GetBin = ({
    bin,
    binId= ""
} : {
    bin: _Bin;
    binId: string;
}) => {
    
      const reportBin = async () => {
        
      const bin = await Bin.reportBin(binId);
      }
    

  return (
    
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
      
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Smart waste bin system</CardTitle>
              <CardDescription className=""><b>Bin name: {bin.name}</b></CardDescription>
              <CardDescription><b>Bin location: {bin.location}</b></CardDescription>
              {/* <CardAction>
                <Button onClick={reportBin} variant="link">Report bin</Button>
              </CardAction> */}
            </CardHeader>
            <CardContent>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button onClick={reportBin} className="w-full">
                Report Bin as full
              </Button>
            </CardFooter>
          </Card>
          </div>
          </div>
  )
}

export default GetBin;
