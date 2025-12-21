import { defineType, defineField } from "sanity";
import { Car } from "lucide-react";

export const car = defineType({
    name: "car",
    title: "Car",
    type: "document",
    icon: Car,
    fields: [
        defineField({
            name: "name",
            title: "Car Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "displayName",
            title: "Display Name (Localized)",
            type: "object",
            fields: [
                defineField({ name: "en", title: "English", type: "string" }),
                defineField({ name: "id", title: "Indonesian", type: "string" }),
            ]
        }),
        defineField({
            name: "description",
            title: "Description (Localized)",
            type: "object",
            fields: [
                defineField({ name: "en", title: "English", type: "text" }),
                defineField({ name: "id", title: "Indonesian", type: "text" }),
            ]
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "model",
            title: "Model Series",
            type: "string",
            options: {
                list: [
                    { title: "Creta", value: "Creta" },
                    { title: "Stargazer", value: "Stargazer" },
                    { title: "Ioniq 5", value: "Ioniq 5" },
                    { title: "Ioniq 6", value: "Ioniq 6" },
                    { title: "Palisade", value: "Palisade" },
                    { title: "Santa Fe", value: "Santa Fe" },
                    { title: "Staria", value: "Staria" },
                    { title: "Kona EV", value: "Kona" },
                ]
            }
        }),
        defineField({
            name: "year",
            title: "Year",
            type: "number",
            validation: (Rule) => Rule.required().min(2000).max(2030),
        }),
        defineField({
            name: "type",
            title: "Listing Type",
            type: "string",
            options: {
                list: [
                    { title: "Used Car Only", value: "Used" },
                    { title: "Rent Only", value: "Rent" },
                    { title: "Both (Used & Rent)", value: "Both" },
                ],
                layout: "radio"
            },
            initialValue: "Both"
        }),
        defineField({
            name: "price",
            title: "Purchase Price (IDR)",
            type: "number",
            hidden: ({ document }) => document?.type === 'Rent',
        }),
        defineField({
            name: "rentPrice",
            title: "Monthly Rent Price (IDR)",
            type: "number",
            hidden: ({ document }) => document?.type === 'Used',
        }),
        defineField({
            name: "image",
            title: "Main Image",
            type: "image",
            options: {
                hotspot: true,
            }
        }),
        defineField({
            name: "specs",
            title: "Specifications",
            type: "object",
            fields: [
                defineField({ name: "mileage", title: "Mileage (km)", type: "number" }),
                defineField({
                    name: "transmission",
                    title: "Transmission",
                    type: "string",
                    options: { list: ["Automatic", "Manual", "iVT", "DCT"] }
                }),
                defineField({
                    name: "fuel",
                    title: "Fuel Type",
                    type: "string",
                    options: { list: ["Petrol", "Diesel", "Electric", "Hybrid"] }
                }),
            ]
        }),
        defineField({
            name: "available",
            title: "Available",
            type: "boolean",
            initialValue: true,
        }),
    ],
});
