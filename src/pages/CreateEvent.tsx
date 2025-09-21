import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Navigation } from "@/components/Navigation";

const eventSchema = z.object({
  name: z.string().min(3, "Event name is required"),
  city: z.string().min(2, "City is required"),
  venue: z.string().min(2, "Venue is required"),
  datetime: z.string().min(1, "Date & time is required"),
  price: z.coerce.number().min(0, "Price must be 0 or more"),
  quantity: z.coerce.number().int().min(1, "At least 1 ticket"),
  description: z.string().min(10, "Add a short description"),
  cover: z.any().optional(),
  teaser: z.any().optional(),
});

type EventForm = z.infer<typeof eventSchema>;

export default function CreateEvent() {
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [teaserName, setTeaserName] = useState<string | null>(null);

  const form = useForm<EventForm>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: "",
      city: "",
      venue: "",
      datetime: "",
      price: 0,
      quantity: 50,
      description: "",
    },
  });

  function onSubmit(values: EventForm) {
    // NOTE: For MVP-without-backend, we simply preview and simulate a save.
    // Later, this will POST to the backend / Supabase.
    // Files are accessible via form.getValues("cover") etc.
    // We store a temp copy in localStorage to simulate draft save.
    const draft = { ...values, coverPreview, teaserName };
    localStorage.setItem("draft_event", JSON.stringify(draft));
    toast.success("Event saved as draft", { description: "You can publish after payments are configured." });
    console.log("CreateEvent submission:", draft);
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold">Create Event</h1>
        <p className="text-muted-foreground">Add your event details. You can upload a cover and an optional short teaser.</p>

        <Separator className="my-6" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basics</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Event name</FormLabel>
                      <FormControl>
                        <Input placeholder="Amapiano Night Accra" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Accra" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="venue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Venue</FormLabel>
                      <FormControl>
                        <Input placeholder="Osu, Bloom Bar" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="datetime"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Date & Time</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormDescription>Local timezone. Guests will see this in their local time.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tickets</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" min={0} step="0.5" placeholder="25" {...field} />
                      </FormControl>
                      <FormDescription>Set to 0 for free entry.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} step="1" placeholder="200" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="cover"
                  render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Cover image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onChange(file);
                              const url = URL.createObjectURL(file);
                              setCoverPreview(url);
                            }
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Recommended 16:9 or 4:5. JPG/PNG.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {coverPreview && (
                  <div className="aspect-video overflow-hidden rounded-lg border">
                    <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="teaser"
                  render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Short video teaser (optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="video/mp4,video/webm"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onChange(file);
                              setTeaserName(file.name);
                            }
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Keep it short (&lt; 30s). For transcoding at scale, we'll integrate a streaming service (e.g. Mux/Cloudflare) later.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {teaserName && <p className="text-sm text-muted-foreground">Selected: {teaserName}</p>}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event description</FormLabel>
                      <FormControl>
                        <Textarea rows={6} placeholder={"Tell guests what's the vibe, lineup, and any special info."} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex gap-3 justify-end">
              <Button type="button" variant="outline" onClick={() => form.reset()}>Reset</Button>
              <Button type="submit" variant="gold">Save Draft</Button>
              <Button type="submit">Publish</Button>
            </div>
          </form>
        </Form>
      </div>

      <Navigation />
    </div>
  );
}
