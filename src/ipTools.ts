import isReservedIP from "reserved-ip";

type linearIP = {
    o1: number,
    o2: number,
    o3: number,
    o4: number
}

export class ipGenerator
{
    static ip: string;
    static goodIp = false;
    static currentLinearIp: linearIP = { o1: 0, o2: 0, o3: 0, o4: 0 }
    static octetGen = octetGen();

    /**
     * Assigns a new IP
     * @param mode - is the IP generation mode
     * @param newIP - can specify certain IP to search for servers in
     */
    static assignIp(mode: "r" | "s" | "l", newIP?: string): void
    {
        switch (mode)
        {
            case "r":
                this.ip = `${this.octetGen.next().value}.${this.octetGen.next().value}.${this.octetGen.next().value}.${this.octetGen.next().value}`;
                break;
            case "l":
                // FIXME: Fix the fuckery I wrote here so that it goes through every IP

                this.currentLinearIp = {
                    o1: this.currentLinearIp.o1 === 255 ? this.currentLinearIp.o1 = 0 : this.currentLinearIp.o1++,
                    o2: this.currentLinearIp.o2 === 255 ? this.currentLinearIp.o2 = 0 : this.currentLinearIp.o2++,
                    o3: this.currentLinearIp.o3 === 255 ? this.currentLinearIp.o3 = 0 : this.currentLinearIp.o3++,
                    o4: this.currentLinearIp.o4 === 255 ? this.currentLinearIp.o4 = 0 : this.currentLinearIp.o4++
                }
                this.ip = `${this.currentLinearIp.o1}.${this.currentLinearIp.o2}.${this.currentLinearIp.o3}.${this.currentLinearIp.o4}`
                break;
            default:
                if (typeof newIP !== "undefined")
                    this.ip = newIP;
                else
                    this.ip = `${this.octetGen.next().value}.${this.octetGen.next().value}.${this.octetGen.next().value}.${this.octetGen.next().value}`;
        }
    }

    /**
     * Manages IP assignment
     * @param mode - is the IP generation mode
     * @param newIP - can specify certain IP to search for servers in
     */
    static generator(mode: "r" | "s" | "l", newIP?: string): string
    {
        this.assignIp(mode, newIP)

        while (!this.goodIp)
        {
            if (!isReservedIP(ipGenerator.ip))
                this.goodIp = true;
            else
                this.assignIp(mode, newIP)
        }

        return ipGenerator.ip
    }
}

export class portGenerator
{
    // TODO:
    //  Check for reserved ports

    static port = 1024
    static portGen = portGen();

    /**
     *
     * @param mode - is the port generation mode
     * @param specificPort - can specify certain port to search for servers in
     */
    static generator(mode: "r" | "l" | "s", specificPort?: number): number
    {
        switch (mode)
        {
            case "r":
                this.port = <number>this.portGen.next().value;
                break;
            case "l":
                this.port !== 1024 ? (this.port === 65535 ? this.port = 0 : this.port++) : this.port = 1024;
                break;
            default:
                if (typeof specificPort !== "undefined")
                    this.port = specificPort;
                else
                    this.port = 19132;
        }

        return this.port
    }
}

/**
 * Generates octets to "bruteforce" IPs
 */
export function* octetGen()
{
    while (true)
        yield Math.floor(Math.random() * (255 + 1));
}

/**
 * Generates port numbers
 */
export function* portGen()
{
    while (true)
        yield Math.floor(Math.random() * (65535 - 1 + 1)) + 1;
}