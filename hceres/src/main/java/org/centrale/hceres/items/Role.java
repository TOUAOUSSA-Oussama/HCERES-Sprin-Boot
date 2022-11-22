package org.centrale.hceres.items;

import lombok.Data;

/**
 * TODO replace admin table to role table having:
 * 1 -> ADMIN
 * 2 -> USER
 *
 * and add column role_id in researcher table
 */
@Data
public class Role {
    private Long id;
    private String name;
}
