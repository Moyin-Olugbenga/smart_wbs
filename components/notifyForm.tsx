"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Bin as _Bin} from "@prisma/client"
import { Bin } from "@/classes/Bin"
import { useState } from "react"

const GetBin = ({
    bin,
    binId= ""
} : {
    bin: _Bin;
    binId: string;
}) => {
    const [message, setMessage] = useState("")
      const reportBin = async () => {
        
      await Bin.reportBin(binId);
      setMessage("Sucessful");

      }
    

  return (
    
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
      
          <Card className="w-full max-w-sm">
            <CardHeader>
              <b className="text-green-700">{message}</b>
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
