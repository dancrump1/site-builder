'use client'

import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Sheet, SheetTrigger, SheetContent } from "../components/ui/sheet";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import "../js/app";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import { ThemeProvider } from "../components/ui/theme-provider";
import { ModeToggle } from "../components/ui/mode-toggle";
import { CardRotation } from "./components/CardRotation";
import { CardContainer, CardItem, CardBody } from "./components/3dCard";
import { DraggableBox } from "./DraggableBox";
import { Container } from "./Container";
import { CustomDragLayer } from "./CustomDragLayer";

const siteURL = process.env.PRIMARY_SITE_URL;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div> home brokadidid</div>,
  },
]);

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={router} />
      </DndProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// Here is where SSR would gain us value. Pull in JS libraries easily, utilize them, have the Server
// return HTML to quickly render while we are fetching data to hydrate said HTML.
/**
 * How to implement a React frontend with GraphQL. Currently not using Server Components. Yet...
 * @returns html that renders as the app
 */
function App() {
  const [response, setResponse] = useState<{ data?: { ping?: string } }>({});
  const [loading, setLoading] = useState(true);

  const [snapToGridAfterDrop, setSnapToGridAfterDrop] = useState(false);
  const [snapToGridWhileDragging, setSnapToGridWhileDragging] = useState(false);
  const handleSnapToGridAfterDropChange = useCallback(() => {
    setSnapToGridAfterDrop(!snapToGridAfterDrop);
  }, [snapToGridAfterDrop]);
  const handleSnapToGridWhileDraggingChange = useCallback(() => {
    setSnapToGridWhileDragging(!snapToGridWhileDragging);
  }, [snapToGridWhileDragging]);

  useEffect(() => {
    //   Vanilla Node.js implementation of generic 'ping' test in craftcms
    // data?.data?.ping
    fetch(siteURL + "/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": "Bearer somethingsomethingsomething", // Get auth token from craftcms admin panel
      },
      body: JSON.stringify({
        query: "{ping}",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setResponse(res);
      });
  }, []);

  if (loading) {
    return <div>loading</div>;
  }

  const elementCardStyles = "border-2";

  return (
    <div className="flex">
      <div className="flex">
        <ModeToggle />
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">open drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <p>
                  <label htmlFor="snapToGridWhileDragging">
                    <input
                      id="snapToGridWhileDragging"
                      type="checkbox"
                      checked={snapToGridWhileDragging}
                      onChange={handleSnapToGridWhileDraggingChange}
                    />
                    <small>Snap to grid while dragging</small>
                  </label>
                  <br />
                  <label htmlFor="snapToGridAfterDrop">
                    <input
                      id="snapToGridAfterDrop"
                      type="checkbox"
                      checked={snapToGridAfterDrop}
                      onChange={handleSnapToGridAfterDropChange}
                    />
                    <small>Snap to grid after drop</small>
                  </label>
                </p>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="flex">
        <Container snapToGrid={snapToGridAfterDrop} />
        <CustomDragLayer snapToGrid={snapToGridWhileDragging} />
      </div>
    </div>
  );
}
