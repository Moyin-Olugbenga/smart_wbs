"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Formik } from "formik";
import { authSchema } from "@/app/schemas/auth"
import { Utility } from "@/classes/clientUtility"
// import { useRouter } from "next/navigation"
import { loginAction } from "@/app/actions/auth"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  
    const initialValues = {
        username: "",
        password: ""
        
    }

  return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Smart waste bin system</CardTitle>
            <CardDescription>
              Login to get to the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            
            <Formik
                initialValues={initialValues}
                validate={async (values) => {
                    const validateFn = await Utility.zodValidate(authSchema);
                    return validateFn(values);
                }}
                onSubmit={async (values) => {
                    try{
                        await loginAction(values); // Use the server action
                    }catch(error){
                        console.log({error});
                    }
                }}
                >
                  {
                    ({ values, errors, touched, handleChange, handleSubmit }) => (
                      <form  method="POST" onSubmit={handleSubmit} >
                        <div className="flex flex-col gap-6">
                          <div className="grid gap-3">
                            <Label htmlFor="username">Username</Label>
                            <Input
                              id="username"
                              type="text"
                              placeholder="Admin"
                              required value={values?.username} onChange={handleChange}
                            />
                                    {touched?.username && errors?.username && <div className='error-feedback'>{errors?.username}</div>}
                                
                          </div>
                          <div className="grid gap-3">
                            <div className="flex items-center">
                              <Label htmlFor="password">Password</Label>
                            </div>
                            <Input id="password" type="password" required value={values?.password} onChange={handleChange}/>
                            
                                    {touched?.password && errors?.password && <div className='error-feedback'>{errors?.password}</div>}
                                
                          </div>
                          <div className="flex flex-col gap-3">
                            <Button type="submit" className="w-full">
                              Login
                            </Button>
                            
                          </div>
                        </div>
                        
                      </form>
                    
                    )
                  }
            </Formik>
          </CardContent>
        </Card>
      </div>
  )
}
