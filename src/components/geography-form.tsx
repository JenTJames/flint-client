import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { regions, countries } from "@/lib/data";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import Option from "@/types/Option.interface";
import GeographyFormProps from "@/types/props/Geography-Form-Props.interface";
import { findOptionByValue } from "@/lib/helpers";

const formSchema = z.object({
  country: z.string().nonempty("Please select a valid country"),
  region: z.string().nonempty("Please select a valid region"),
});

const GeographyForm: React.FC<GeographyFormProps> = ({
  geographies,
  addGeography,
}) => {
  const [countryOptions, setCountryOptions] = useState<Option[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      region: "",
    },
  });

  const selectedRegion = form.watch("region");
  const selectedCountry = form.watch("country");

  useEffect(() => {
    const filteredCountries = countries.filter(
      (country) => country.continentId === selectedRegion
    );
    setCountryOptions(filteredCountries);
    form.setValue("country", "");
    form.clearErrors("country");
  }, [selectedRegion, form]);

  useEffect(() => {
    const country = findOptionByValue(selectedCountry, countries);

    if (country) {
      const countryExists = !!geographies.find(
        (geography) =>
          geography.country.toLowerCase() === country.label.toLowerCase()
      );

      if (countryExists)
        form.setError("country", {
          message: "This country already exists",
          type: "manual",
        });
      else form.clearErrors("country");
    }
  }, [countryOptions, form, selectedCountry, geographies]);

  const saveGeographyHandler = (values: z.infer<typeof formSchema>) => {
    const region = findOptionByValue(values.region, regions);
    const country = findOptionByValue(values.country, countries);
    addGeography({
      country: country?.label || "",
      region: region?.label || "",
    });
  };

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(saveGeographyHandler)}
      >
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Region</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? regions.find((region) => region.value === field.value)
                            ?.label
                        : "Select Region"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search Region..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No region found.</CommandEmpty>
                      <CommandGroup>
                        {regions.map((region) => (
                          <CommandItem
                            value={region.label}
                            key={region.value}
                            onSelect={() => {
                              form.setValue("region", region.value);
                            }}
                          >
                            {region.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                region.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Country</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? countryOptions.find(
                            (country) => country.value === field.value
                          )?.label
                        : "Select Country"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search Country..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countryOptions.map((country) => (
                          <CommandItem
                            value={country.label}
                            key={country.value}
                            onSelect={() => {
                              form.setValue("country", country.value);
                            }}
                          >
                            {country.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                country.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={Object.keys(form.formState.errors).length > 0}
          type="submit"
          className="w-full"
        >
          Save
        </Button>
      </form>
    </Form>
  );
};

export default GeographyForm;
