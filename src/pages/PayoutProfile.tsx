import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Navigation } from "@/components/Navigation";

const payoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(6, "Phone is required"),
  country: z.string().min(2, "Country required"),
  provider: z.enum(["paystack", "flutterwave", "mpesa", "mtn_momo"]).optional(),
  accountName: z.string().min(2, "Account name required"),
  accountNumber: z.string().min(3, "Account or wallet number required"),
  bankOrWallet: z.string().min(2, "Bank or Wallet provider required"),
});

type PayoutForm = z.infer<typeof payoutSchema>;

export default function PayoutProfile() {
  const form = useForm<PayoutForm>({
    resolver: zodResolver(payoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      provider: "paystack",
      accountName: "",
      accountNumber: "",
      bankOrWallet: "",
    },
  });

  function onSubmit(values: PayoutForm) {
    localStorage.setItem("payout_profile", JSON.stringify(values));
    toast.success("Payout profile saved", { description: "We will verify details during onboarding." });
    console.log("Payout profile:", values);
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold">Payout Profile</h1>
        <p className="text-muted-foreground">Add details for receiving payouts from ticket sales and tips.</p>

        <Separator className="my-6" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input placeholder="Ama Mensah" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="ama@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+233 55 123 4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Ghana" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payout Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="provider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred provider</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose provider" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="paystack">Paystack</SelectItem>
                          <SelectItem value="flutterwave">Flutterwave</SelectItem>
                          <SelectItem value="mpesa">M-Pesa</SelectItem>
                          <SelectItem value="mtn_momo">MTN MoMo</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Well support multiple providers and currencies over time.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="bankOrWallet"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank / Wallet</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Access Bank / MTN Mobile Money" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="accountName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account name</FormLabel>
                        <FormControl>
                          <Input placeholder="Ama Mensah" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account / Wallet number</FormLabel>
                      <FormControl>
                        <Input placeholder="XXXXXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex gap-3 justify-end">
              <Button type="button" variant="outline" onClick={() => form.reset()}>Reset</Button>
              <Button type="submit" variant="gold">Save</Button>
            </div>
          </form>
        </Form>
      </div>

      <Navigation />
    </div>
  );
}
