import { ScrollArea } from "@/components/ui/scroll-area";

function TFScrollArea({
    children,
    className = "",
    scrollbarClassName = "",
    thumbClassName = "",
    orientation = "vertical",
}) {
    return (
        <ScrollArea
            className={className}
            scrollbarClassName={scrollbarClassName}
            thumbClassName={thumbClassName}
            orientation={orientation}
        >
            {children}
        </ScrollArea>
    );
}

export default TFScrollArea;