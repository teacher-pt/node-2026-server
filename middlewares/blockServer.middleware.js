// middleware creator - יוצר מידלווארים

export function blockHours(from, to) {
    // מידלוואר שחוסם גישה לאתר בטווח שעות נתון
    const blockMiddleware = (req, res, next) => {
        const now = new Date();
        const hour = now.getHours();

        if (hour >= from && hour <= to) {
            // go to error middleware
            return next({ msg: 'server not work now!' })
        }

        // ממשיך הלאה
        return next();
    };
    
    return blockMiddleware;
}


// TODO: שליחת פרמטרים